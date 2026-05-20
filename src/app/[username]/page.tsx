"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { type ReactNode, useEffect, useMemo, useState } from "react"
import {
  collection,
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore"

import { LinkList } from "@/components/link-list"
import { db } from "@/lib/firebase"
import { normalizeUsername, type UserProfile } from "@/lib/profile"
import type { LinkItem } from "@/data/links"

type FirestoreLink = {
  title?: string
  url?: string
  description?: string
  icon?: string
  color?: string
}

export default function PublicProfilePage() {
  const params = useParams<{ username: string }>()
  const username = useMemo(() => {
    const rawUsername = Array.isArray(params.username)
      ? params.username[0]
      : params.username

    return normalizeUsername(decodeURIComponent(rawUsername ?? ""))
  }, [params.username])

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [links, setLinks] = useState<LinkItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    async function loadPublicProfile() {
      try {
        setIsLoading(true)
        setIsNotFound(false)

        if (!username) {
          setIsNotFound(true)
          return
        }

        const profileSnapshot = await getDocs(
          query(
            collectionGroup(db, "profile"),
            where("username", "==", username),
            limit(1)
          )
        )

        if (profileSnapshot.empty) {
          setIsNotFound(true)
          return
        }

        const profileDoc = profileSnapshot.docs[0]
        const profileData = profileDoc.data()
        const userId =
          profileDoc.ref.parent.parent?.id ??
          (typeof profileData.userId === "string" ? profileData.userId : "")

        if (!userId) {
          setIsNotFound(true)
          return
        }

        const nextProfile = {
          userId,
          username:
            typeof profileData.username === "string"
              ? profileData.username
              : username,
          displayName:
            typeof profileData.displayName === "string"
              ? profileData.displayName
              : username,
          bio: typeof profileData.bio === "string" ? profileData.bio : "",
        }

        const linksSnapshot = await getDocs(
          query(
            collection(db, "users", userId, "links"),
            orderBy("createdAt", "asc")
          )
        )

        setProfile(nextProfile)
        setLinks(linksSnapshot.docs.map(toLinkItem))
      } catch {
        setIsNotFound(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadPublicProfile()
  }, [username])

  if (isLoading) {
    return <PublicShell>불러오는 중입니다</PublicShell>
  }

  if (isNotFound || !profile) {
    return (
      <PublicShell>
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em]">404</p>
          <h1 className="mt-3 text-3xl font-black">페이지를 찾을 수 없습니다</h1>
          <Link
            href="/"
            className="mt-6 inline-block rounded-[12px] border-[3px] border-black bg-white px-4 py-2 text-sm font-black shadow-[4px_4px_0_#000]"
          >
            홈으로
          </Link>
        </div>
      </PublicShell>
    )
  }

  return (
    <main className="min-h-screen bg-[#7dd3fc] px-4 py-6 text-black sm:px-6">
      <section className="mx-auto flex min-h-[calc(100vh-48px)] w-full items-center justify-center">
        <div className="w-full rounded-[12px] border-[3px] border-black bg-[#FEF08A] p-4 shadow-[6px_6px_0_#000] sm:w-[80%] sm:max-w-[480px] sm:p-6 lg:w-[400px]">
          <header className="text-center">
            <div className="mx-auto mb-5 flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full border-[3px] border-black bg-[#ff8fab] shadow-[6px_6px_0_#000]">
              <span className="text-4xl font-black">
                {getProfileInitials(profile.displayName)}
              </span>
            </div>
            <p className="break-all text-sm font-black uppercase tracking-[0.18em]">
              @{profile.username}
            </p>
            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              {profile.displayName}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base font-semibold leading-7">
              {profile.bio}
            </p>
          </header>

          {links.length ? (
            <LinkList links={links} />
          ) : (
            <p className="mt-7 rounded-[12px] border-[3px] border-black bg-white px-4 py-3 text-center text-sm font-black shadow-[4px_4px_0_#000]">
              아직 등록된 링크가 없습니다
            </p>
          )}

          <footer className="pt-6 text-center text-sm font-black">
            mylink/{profile.username}
          </footer>
        </div>
      </section>
    </main>
  )
}

function PublicShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#7dd3fc] px-4 py-6 text-black sm:px-6">
      <section className="mx-auto flex min-h-[calc(100vh-48px)] w-full items-center justify-center">
        <div className="w-full rounded-[12px] border-[3px] border-black bg-[#FEF08A] p-6 text-center text-lg font-black shadow-[6px_6px_0_#000] sm:w-[80%] sm:max-w-[480px] lg:w-[400px]">
          {children}
        </div>
      </section>
    </main>
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

function getProfileInitials(displayName: string) {
  const trimmedName = displayName.trim()

  if (!trimmedName) {
    return "ML"
  }

  return trimmedName
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}
