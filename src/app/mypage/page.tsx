"use client"

import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type Timestamp,
  updateDoc,
} from "firebase/firestore"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { links as initialLinks, type LinkItem } from "@/data/links"
import { auth, db, googleProvider } from "@/lib/firebase"
import {
  getDefaultProfile,
  getUsernameError,
  normalizeUsername,
  type UserProfile,
} from "@/lib/profile"

const linkColors = ["bg-[#FF8FAB]", "bg-[#8DD3C7]", "bg-[#A78BFA]", "bg-white"]

type FirestoreLink = {
  title?: string
  url?: string
  description?: string
  icon?: string
  color?: string
  createdAt?: Timestamp
}

function getIcon(title: string) {
  return title
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function getValidUrl(value: string) {
  try {
    const url = new URL(value)

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null
    }

    return url.href
  } catch {
    return null
  }
}

function getErrorMessage(title: string, url: string) {
  if (!title.trim()) {
    return "제목을 입력해주세요"
  }

  if (!url.trim()) {
    return "주소를 입력해주세요"
  }

  if (!getValidUrl(url.trim())) {
    return "올바른 주소를 입력해주세요"
  }

  return ""
}

function getLinksCollection(userId: string) {
  return collection(db, "users", userId, "links")
}

function getProfileDoc(userId: string) {
  return doc(db, "users", userId, "profile", "main")
}

function getUsernameDoc(username: string) {
  return doc(db, "usernames", username)
}

async function findUsernameOwner(username: string) {
  const snapshot = await getDoc(getUsernameDoc(username))

  if (!snapshot.exists()) {
    return null
  }

  const data = snapshot.data()

  return typeof data.userId === "string" ? data.userId : null
}

export default function MyPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthReady, setIsAuthReady] = useState(false)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [username, setUsername] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [bio, setBio] = useState("")
  const [profileError, setProfileError] = useState("")
  const [profileStatus, setProfileStatus] = useState("")
  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const [isProfileSaving, setIsProfileSaving] = useState(false)
  const [links, setLinks] = useState<LinkItem[]>([])
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editUrl, setEditUrl] = useState("")
  const [deleteTarget, setDeleteTarget] = useState<LinkItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setIsAuthReady(true)

      if (!nextUser) {
        setProfile(null)
        setUsername("")
        setDisplayName("")
        setBio("")
        setProfileError("")
        setProfileStatus("")
        setIsProfileLoading(false)
        setLinks([])
        setIsLoading(false)
      }
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if (!isAuthReady) {
      return
    }

    if (!user) {
      return
    }

    function updateProfileForm(nextProfile: UserProfile) {
      setProfile(nextProfile)
      setUsername(nextProfile.username)
      setDisplayName(nextProfile.displayName)
      setBio(nextProfile.bio)
    }

    async function loadProfile() {
      if (!user) {
        return
      }

      try {
        setIsProfileLoading(true)
        const snapshot = await getDoc(getProfileDoc(user.uid))

        if (!snapshot.exists()) {
          const defaultProfile = getDefaultProfile(user)
          const defaultOwner = await findUsernameOwner(defaultProfile.username)
          const nextProfile =
            defaultOwner && defaultOwner !== user.uid
              ? {
                  ...defaultProfile,
                  username: normalizeUsername(
                    `${defaultProfile.username}-${user.uid.slice(0, 6)}`
                  ),
                }
              : defaultProfile

          await setDoc(getProfileDoc(user.uid), {
            ...nextProfile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
          await setDoc(getUsernameDoc(nextProfile.username), {
            userId: user.uid,
            username: nextProfile.username,
            updatedAt: serverTimestamp(),
          })

          updateProfileForm(nextProfile)
          setProfileError("")
          return
        }

        const data = snapshot.data()
        const nextProfile = {
          userId:
            typeof data.userId === "string" && data.userId
              ? data.userId
              : user.uid,
          username:
            typeof data.username === "string" && data.username
              ? data.username
              : getDefaultProfile(user).username,
          displayName:
            typeof data.displayName === "string" && data.displayName
              ? data.displayName
              : getDefaultProfile(user).displayName,
          bio:
            typeof data.bio === "string" && data.bio
              ? data.bio
              : getDefaultProfile(user).bio,
        }
        const ownerId = await findUsernameOwner(nextProfile.username)

        if (!ownerId || ownerId === user.uid) {
          await setDoc(
            getUsernameDoc(nextProfile.username),
            {
              userId: user.uid,
              username: nextProfile.username,
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          )
        }

        updateProfileForm(nextProfile)
        setProfileError("")
      } catch {
        setProfileError("프로필을 불러오지 못했습니다")
      } finally {
        setIsProfileLoading(false)
      }
    }

    async function loadLinks() {
      if (!user) {
        return
      }

      const userLinksCollection = getLinksCollection(user.uid)

      try {
        setIsLoading(true)
        const snapshot = await getDocs(
          query(userLinksCollection, orderBy("createdAt", "asc"))
        )

        if (snapshot.empty) {
          await Promise.all(
            initialLinks.map((link) =>
              setDoc(doc(db, "users", user.uid, "links", `default-${link.id}`), {
                title: link.title,
                description: link.description,
                url: link.url,
                icon: link.icon,
                color: link.color,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              })
            )
          )

          const seededSnapshot = await getDocs(
            query(userLinksCollection, orderBy("createdAt", "asc"))
          )

          setLinks(seededSnapshot.docs.map(toLinkItem))
          setError("")
          return
        }

        setLinks(snapshot.docs.map(toLinkItem))
        setError("")
      } catch {
        setError("저장된 링크를 불러오지 못했습니다")
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
    loadLinks()
  }, [isAuthReady, user])

  async function handleSignIn() {
    setIsSigningIn(true)

    try {
      await signInWithPopup(auth, googleProvider)
      setError("")
    } catch {
      setError("Google 로그인에 실패했습니다")
    } finally {
      setIsSigningIn(false)
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth)
      setProfile(null)
      setUsername("")
      setDisplayName("")
      setBio("")
      setProfileError("")
      setProfileStatus("")
      setLinks([])
      setError("")
    } catch {
      setError("로그아웃에 실패했습니다")
    }
  }

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!user) {
      setProfileError("로그인이 필요합니다")
      return
    }

    const nextUsername = normalizeUsername(username)
    const nextDisplayName = displayName.trim()
    const nextBio = bio.trim()
    const usernameError = getUsernameError(nextUsername)

    if (usernameError) {
      setProfileError(usernameError)
      setProfileStatus("")
      return
    }

    if (!nextDisplayName) {
      setProfileError("표시 이름을 입력해주세요")
      setProfileStatus("")
      return
    }

    if (!nextBio) {
      setProfileError("소개글을 입력해주세요")
      setProfileStatus("")
      return
    }

    setIsProfileSaving(true)

    try {
      let ownerId: string | null = null

      try {
        ownerId = await findUsernameOwner(nextUsername)
      } catch (error) {
        const code = getFirebaseErrorCode(error)

        setProfileError(
          code === "permission-denied"
            ? "username 중복 체크가 Firestore Rules 때문에 막혔습니다"
            : "username 중복 체크에 실패했습니다"
        )
        setProfileStatus("")
        return
      }

      if (ownerId && ownerId !== user.uid) {
        setProfileError("이미 사용 중인 username입니다")
        setProfileStatus("")
        return
      }

      const nextProfile = {
        userId: user.uid,
        username: nextUsername,
        displayName: nextDisplayName,
        bio: nextBio,
      }
      const previousUsername = profile?.username

      try {
        await setDoc(
          getUsernameDoc(nextUsername),
          {
            userId: user.uid,
            username: nextUsername,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        )

        await setDoc(
          getProfileDoc(user.uid),
          {
            ...nextProfile,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        )
      } catch (error) {
        const code = getFirebaseErrorCode(error)

        setProfileError(
          code === "permission-denied"
            ? `username 또는 프로필 저장 권한이 막혔습니다. 로그인 UID: ${user.uid}`
            : "프로필을 저장하지 못했습니다"
        )
        setProfileStatus("")
        return
      }

      if (previousUsername && previousUsername !== nextUsername) {
        await deleteDoc(getUsernameDoc(previousUsername)).catch(() => {})
      }

      setProfile(nextProfile)
      setUsername(nextUsername)
      setDisplayName(nextDisplayName)
      setBio(nextBio)
      setProfileError("")
      setProfileStatus("프로필이 저장되었습니다")
    } catch {
      setProfileError("프로필을 저장하지 못했습니다")
      setProfileStatus("")
    } finally {
      setIsProfileSaving(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!user) {
      setError("로그인이 필요합니다")
      return
    }

    const trimmedTitle = title.trim()
    const trimmedUrl = url.trim()
    const validationError = getErrorMessage(trimmedTitle, trimmedUrl)

    if (validationError) {
      setError(validationError)
      return
    }

    setIsSaving(true)

    const validUrl = getValidUrl(trimmedUrl)

    const nextLink: LinkItem = {
      id: `pending-${Date.now()}`,
      title: trimmedTitle,
      description: validUrl ?? trimmedUrl,
      url: validUrl ?? trimmedUrl,
      icon: getIcon(trimmedTitle) || "LK",
      color: linkColors[links.length % linkColors.length],
    }

    try {
      const docRef = await addDoc(getLinksCollection(user.uid), {
        title: nextLink.title,
        description: nextLink.description,
        url: nextLink.url,
        icon: nextLink.icon,
        color: nextLink.color,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      setLinks((currentLinks) => [
        ...currentLinks,
        {
          ...nextLink,
          id: docRef.id,
        },
      ])
      setTitle("")
      setUrl("")
      setError("")
    } catch {
      setError("링크를 저장하지 못했습니다")
    } finally {
      setIsSaving(false)
    }
  }

  function startEdit(link: LinkItem) {
    setEditingId(String(link.id))
    setEditTitle(link.title)
    setEditUrl(link.url)
    setError("")
  }

  function cancelEdit() {
    setEditingId(null)
    setEditTitle("")
    setEditUrl("")
    setError("")
  }

  async function handleUpdate(link: LinkItem) {
    if (!user) {
      setError("로그인이 필요합니다")
      return
    }

    const trimmedTitle = editTitle.trim()
    const trimmedUrl = editUrl.trim()
    const validationError = getErrorMessage(trimmedTitle, trimmedUrl)

    if (validationError) {
      setError(validationError)
      return
    }

    const validUrl = getValidUrl(trimmedUrl)
    const nextLink = {
      ...link,
      title: trimmedTitle,
      description: validUrl ?? trimmedUrl,
      url: validUrl ?? trimmedUrl,
      icon: getIcon(trimmedTitle) || "LK",
    }

    setIsUpdating(true)

    try {
      await updateDoc(doc(db, "users", user.uid, "links", String(link.id)), {
        title: nextLink.title,
        description: nextLink.description,
        url: nextLink.url,
        icon: nextLink.icon,
        updatedAt: serverTimestamp(),
      })

      setLinks((currentLinks) =>
        currentLinks.map((currentLink) =>
          currentLink.id === link.id ? nextLink : currentLink
        )
      )
      cancelEdit()
    } catch {
      setError("링크를 수정하지 못했습니다")
    } finally {
      setIsUpdating(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) {
      return
    }

    if (!user) {
      setError("로그인이 필요합니다")
      return
    }

    setIsDeleting(true)

    try {
      await deleteDoc(
        doc(db, "users", user.uid, "links", String(deleteTarget.id))
      )
      setLinks((currentLinks) =>
        currentLinks.filter((link) => link.id !== deleteTarget.id)
      )
      setDeleteTarget(null)
      setError("")
    } catch {
      setError("링크를 삭제하지 못했습니다")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#7dd3fc] px-4 py-6 text-black sm:px-6">
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-5">
        <header className="rounded-[12px] border-[3px] border-black bg-[#FEF08A] p-5 shadow-[6px_6px_0_#000]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em]">
                MyLink Admin
              </p>
              <h1 className="mt-2 text-4xl font-black">내 링크 관리</h1>
              <p className="mt-3 text-base font-semibold leading-7">
                Google 계정으로 로그인한 뒤 내 링크를 추가, 수정, 삭제합니다.
              </p>
            </div>

            <AuthAction
              isAuthReady={isAuthReady}
              isSigningIn={isSigningIn}
              user={user}
              onSignIn={handleSignIn}
              onSignOut={handleSignOut}
            />
          </div>
        </header>

        {user ? (
          <>
            <ProfileForm
              bio={bio}
              displayName={displayName}
              isLoading={isProfileLoading}
              isSaving={isProfileSaving}
              profile={profile}
              profileError={profileError}
              profileStatus={profileStatus}
              username={username}
              onBioChange={setBio}
              onDisplayNameChange={setDisplayName}
              onSubmit={handleProfileSubmit}
              onUsernameChange={setUsername}
            />

            <Card className="rounded-[12px] border-[3px] border-black bg-white py-0 text-black shadow-[6px_6px_0_#000] ring-0">
              <CardHeader className="px-5 pt-5">
                <CardTitle className="text-2xl font-black">링크 추가</CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <label className="flex flex-col gap-2 text-sm font-black">
                    제목
                    <Input
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="예: YouTube"
                      className="h-12 rounded-[12px] border-[3px] border-black bg-[#FEF08A] px-4 text-base font-semibold text-black placeholder:text-black/50 focus-visible:ring-4 focus-visible:ring-[#A78BFA]"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm font-black">
                    주소
                    <Input
                      value={url}
                      onChange={(event) => setUrl(event.target.value)}
                      placeholder="https://example.com"
                      className="h-12 rounded-[12px] border-[3px] border-black bg-[#FEF08A] px-4 text-base font-semibold text-black placeholder:text-black/50 focus-visible:ring-4 focus-visible:ring-[#A78BFA]"
                    />
                  </label>

                  {error ? (
                    <p className="rounded-[12px] border-[3px] border-black bg-[#FF8FAB] px-4 py-3 text-sm font-black">
                      {error}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="h-12 rounded-[12px] border-[3px] border-black bg-[#5B5FC7] text-base font-black text-white shadow-[4px_4px_0_#000] hover:bg-[#4b4fb0] focus-visible:ring-4 focus-visible:ring-[#A78BFA]"
                  >
                    {isSaving ? "저장 중..." : "추가하기"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="rounded-[12px] border-[3px] border-black bg-white py-0 text-black shadow-[6px_6px_0_#000] ring-0">
            <CardHeader className="px-5 pt-5">
              <CardTitle className="text-2xl font-black">
                로그인이 필요합니다
              </CardTitle>
              <CardDescription className="text-base font-semibold leading-7 text-black">
                링크 관리는 Google 로그인 후 사용할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {error ? (
                <p className="rounded-[12px] border-[3px] border-black bg-[#FF8FAB] px-4 py-3 text-sm font-black">
                  {error}
                </p>
              ) : null}
              <Button
                type="button"
                disabled={!isAuthReady || isSigningIn}
                className="mt-4 h-12 w-full rounded-[12px] border-[3px] border-black bg-[#5B5FC7] text-base font-black text-white shadow-[4px_4px_0_#000] hover:bg-[#4b4fb0]"
                onClick={handleSignIn}
              >
                {isSigningIn ? "로그인 중..." : "Google로 로그인"}
              </Button>
            </CardContent>
          </Card>
        )}

        <section className="rounded-[12px] border-[3px] border-black bg-[#FEF08A] p-4 shadow-[6px_6px_0_#000] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black">링크 목록</h2>
            <span className="rounded-full border-[3px] border-black bg-white px-3 py-1 text-sm font-black">
              {links.length}개
            </span>
          </div>
          {!user ? (
            <p className="mt-7 rounded-[12px] border-[3px] border-black bg-white px-4 py-3 text-sm font-black shadow-[4px_4px_0_#000]">
              로그인하면 내 저장 링크가 표시됩니다
            </p>
          ) : isLoading ? (
            <p className="mt-7 rounded-[12px] border-[3px] border-black bg-white px-4 py-3 text-sm font-black shadow-[4px_4px_0_#000]">
              저장된 링크를 불러오는 중입니다
            </p>
          ) : (
            <ManageLinkList
              editTitle={editTitle}
              editUrl={editUrl}
              editingId={editingId}
              isUpdating={isUpdating}
              links={links}
              onCancelEdit={cancelEdit}
              onDelete={setDeleteTarget}
              onEditTitleChange={setEditTitle}
              onEditUrlChange={setEditUrl}
              onSaveEdit={handleUpdate}
              onStartEdit={startEdit}
            />
          )}
        </section>

        <Link
          href={profile ? `/${profile.username}` : "/"}
          className="self-center rounded-[12px] border-[3px] border-black bg-white px-4 py-2 text-sm font-black shadow-[4px_4px_0_#000]"
        >
          공개 페이지 보기
        </Link>
      </section>

      {deleteTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-[12px] border-[3px] border-black bg-white p-5 text-black shadow-[6px_6px_0_#000]">
            <h2 className="text-2xl font-black">정말 삭제하시겠습니까?</h2>
            <p className="mt-3 text-base font-semibold leading-7">
              &quot;{deleteTarget.title}&quot; 링크가 삭제됩니다.
            </p>
            <p className="mt-3 rounded-[12px] border-[3px] border-black bg-[#FF8FAB] px-4 py-3 text-sm font-black">
              이 작업은 되돌릴 수 없습니다.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Button
                type="button"
                className="h-11 rounded-[12px] border-[3px] border-black bg-white text-sm font-black text-black shadow-[4px_4px_0_#000] hover:bg-[#FEF08A]"
                onClick={() => setDeleteTarget(null)}
              >
                취소
              </Button>
              <Button
                type="button"
                className="h-11 rounded-[12px] border-[3px] border-black bg-[#ef4444] text-sm font-black text-white shadow-[4px_4px_0_#000] hover:bg-[#dc2626]"
                disabled={isDeleting}
                onClick={handleDelete}
              >
                {isDeleting ? "삭제 중..." : "삭제하기"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}

function getFirebaseErrorCode(error: unknown) {
  return typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
    ? error.code
    : ""
}

type AuthActionProps = {
  isAuthReady: boolean
  isSigningIn: boolean
  user: User | null
  onSignIn: () => void
  onSignOut: () => void
}

function AuthAction({
  isAuthReady,
  isSigningIn,
  user,
  onSignIn,
  onSignOut,
}: AuthActionProps) {
  if (!isAuthReady) {
    return (
      <span className="rounded-[12px] border-[3px] border-black bg-white px-4 py-3 text-sm font-black shadow-[4px_4px_0_#000]">
        확인 중...
      </span>
    )
  }

  if (!user) {
    return (
      <Button
        type="button"
        disabled={isSigningIn}
        className="h-11 rounded-[12px] border-[3px] border-black bg-[#5B5FC7] px-4 text-sm font-black text-white shadow-[4px_4px_0_#000] hover:bg-[#4b4fb0]"
        onClick={onSignIn}
      >
        {isSigningIn ? "로그인 중..." : "Google 로그인"}
      </Button>
    )
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <p className="max-w-full break-all rounded-[12px] border-[3px] border-black bg-white px-4 py-2 text-sm font-black shadow-[4px_4px_0_#000]">
        {user.displayName ?? user.email ?? "로그인됨"}
      </p>
      <Button
        type="button"
        className="h-10 rounded-[12px] border-[3px] border-black bg-white px-4 text-sm font-black text-black shadow-[4px_4px_0_#000] hover:bg-[#FEF08A]"
        onClick={onSignOut}
      >
        로그아웃
      </Button>
    </div>
  )
}

type ProfileFormProps = {
  bio: string
  displayName: string
  isLoading: boolean
  isSaving: boolean
  profile: UserProfile | null
  profileError: string
  profileStatus: string
  username: string
  onBioChange: (value: string) => void
  onDisplayNameChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onUsernameChange: (value: string) => void
}

function ProfileForm({
  bio,
  displayName,
  isLoading,
  isSaving,
  profile,
  profileError,
  profileStatus,
  username,
  onBioChange,
  onDisplayNameChange,
  onSubmit,
  onUsernameChange,
}: ProfileFormProps) {
  const publicUsername = normalizeUsername(username)

  return (
    <Card className="rounded-[12px] border-[3px] border-black bg-white py-0 text-black shadow-[6px_6px_0_#000] ring-0">
      <CardHeader className="px-5 pt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-2xl font-black">프로필 수정</CardTitle>
            <CardDescription className="mt-2 break-all text-base font-semibold leading-7 text-black">
              /{publicUsername || profile?.username || "username"}
            </CardDescription>
          </div>
          {profile ? (
            <Link
              href={`/${profile.username}`}
              className="rounded-[12px] border-[3px] border-black bg-[#FEF08A] px-4 py-2 text-sm font-black shadow-[4px_4px_0_#000]"
            >
              공개 페이지
            </Link>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        {isLoading ? (
          <p className="rounded-[12px] border-[3px] border-black bg-[#FEF08A] px-4 py-3 text-sm font-black">
            프로필을 불러오는 중입니다
          </p>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <label className="flex flex-col gap-2 text-sm font-black">
              username
              <Input
                value={username}
                onChange={(event) => onUsernameChange(event.target.value)}
                placeholder="list.hyunseo"
                className="h-12 rounded-[12px] border-[3px] border-black bg-[#FEF08A] px-4 text-base font-semibold text-black placeholder:text-black/50 focus-visible:ring-4 focus-visible:ring-[#A78BFA]"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-black">
              표시 이름
              <Input
                value={displayName}
                onChange={(event) => onDisplayNameChange(event.target.value)}
                placeholder="최현서"
                className="h-12 rounded-[12px] border-[3px] border-black bg-[#FEF08A] px-4 text-base font-semibold text-black placeholder:text-black/50 focus-visible:ring-4 focus-visible:ring-[#A78BFA]"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-black">
              소개글
              <textarea
                value={bio}
                onChange={(event) => onBioChange(event.target.value)}
                placeholder="나를 소개하는 짧은 문장"
                rows={3}
                className="min-h-24 resize-y rounded-[12px] border-[3px] border-black bg-[#FEF08A] px-4 py-3 text-base font-semibold text-black placeholder:text-black/50 focus-visible:ring-4 focus-visible:ring-[#A78BFA] focus-visible:outline-none"
              />
            </label>

            {profileError ? (
              <p className="rounded-[12px] border-[3px] border-black bg-[#FF8FAB] px-4 py-3 text-sm font-black">
                {profileError}
              </p>
            ) : null}

            {profileStatus ? (
              <p className="rounded-[12px] border-[3px] border-black bg-[#8DD3C7] px-4 py-3 text-sm font-black">
                {profileStatus}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={isSaving}
              className="h-12 rounded-[12px] border-[3px] border-black bg-[#5B5FC7] text-base font-black text-white shadow-[4px_4px_0_#000] hover:bg-[#4b4fb0] focus-visible:ring-4 focus-visible:ring-[#A78BFA]"
            >
              {isSaving ? "저장 중..." : "프로필 저장"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

function toLinkItem(docSnapshot: { id: string; data: () => FirestoreLink }) {
  const data = docSnapshot.data()

  return {
    id: docSnapshot.id,
    title: data.title ?? "Untitled",
    description: data.description ?? data.url ?? "",
    url: data.url ?? "#",
    icon: data.icon ?? "LK",
    color: data.color ?? "bg-white",
  }
}

type ManageLinkListProps = {
  editTitle: string
  editUrl: string
  editingId: string | null
  isUpdating: boolean
  links: LinkItem[]
  onCancelEdit: () => void
  onDelete: (link: LinkItem) => void
  onEditTitleChange: (value: string) => void
  onEditUrlChange: (value: string) => void
  onSaveEdit: (link: LinkItem) => void
  onStartEdit: (link: LinkItem) => void
}

function ManageLinkList({
  editTitle,
  editUrl,
  editingId,
  isUpdating,
  links,
  onCancelEdit,
  onDelete,
  onEditTitleChange,
  onEditUrlChange,
  onSaveEdit,
  onStartEdit,
}: ManageLinkListProps) {
  return (
    <div className="mt-7 flex flex-col gap-3">
      {links.map((link) => {
        const isEditing = editingId === String(link.id)

        return (
          <Card
            key={link.id}
            className={`gap-0 rounded-[12px] border-[3px] border-black px-0 py-0 text-black shadow-[4px_4px_0_#000] ring-0 ${link.color}`}
          >
            <CardHeader className="grid-cols-[auto_1fr] items-center gap-3 px-4 py-3">
              <span className="flex size-11 items-center justify-center rounded-full border-[3px] border-black bg-white text-sm font-black">
                {link.icon}
              </span>

              {isEditing ? (
                <CardContent className="flex flex-col gap-3 px-0">
                  <Input
                    value={editTitle}
                    onChange={(event) => onEditTitleChange(event.target.value)}
                    className="h-11 rounded-[12px] border-[3px] border-black bg-white px-3 text-base font-black text-black"
                  />
                  <Input
                    value={editUrl}
                    onChange={(event) => onEditUrlChange(event.target.value)}
                    className="h-11 rounded-[12px] border-[3px] border-black bg-white px-3 text-base font-semibold text-black"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      className="h-10 rounded-[12px] border-[3px] border-black bg-[#5B5FC7] text-sm font-black text-white shadow-[3px_3px_0_#000]"
                      disabled={isUpdating}
                      onClick={() => onSaveEdit(link)}
                    >
                      {isUpdating ? "저장 중..." : "저장"}
                    </Button>
                    <Button
                      type="button"
                      className="h-10 rounded-[12px] border-[3px] border-black bg-white text-sm font-black text-black shadow-[3px_3px_0_#000]"
                      onClick={onCancelEdit}
                    >
                      취소
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <>
                  <CardContent className="px-0">
                    <CardTitle className="text-lg font-black">
                      {link.title}
                    </CardTitle>
                    <CardDescription className="mt-1 break-all text-sm font-semibold leading-6 text-black">
                      {link.url}
                    </CardDescription>
                  </CardContent>
                  <CardAction className="col-span-2 mt-3 flex gap-2 sm:col-start-2 sm:mt-0 sm:justify-self-end">
                    <Button
                      type="button"
                      className="h-9 rounded-[12px] border-[3px] border-black bg-white px-3 text-sm font-black text-black shadow-[3px_3px_0_#000]"
                      onClick={() => onStartEdit(link)}
                    >
                      수정
                    </Button>
                    <Button
                      type="button"
                      className="h-9 rounded-[12px] border-[3px] border-black bg-[#ef4444] px-3 text-sm font-black text-white shadow-[3px_3px_0_#000]"
                      onClick={() => onDelete(link)}
                    >
                      삭제
                    </Button>
                  </CardAction>
                </>
              )}
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}
