export type UserProfile = {
  userId: string
  username: string
  displayName: string
  bio: string
}

type ProfileSeedUser = {
  uid: string
  displayName: string | null
  email: string | null
}

export function normalizeUsername(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/[._-]{2,}/g, "-")
    .replace(/^[._-]+|[._-]+$/g, "")
    .slice(0, 30)
}

export function getUsernameError(username: string) {
  if (!username) {
    return "username을 입력해주세요"
  }

  if (username.length < 3) {
    return "username은 3자 이상이어야 합니다"
  }

  if (!/^[a-z0-9._-]+$/.test(username)) {
    return "username은 영문 소문자, 숫자, 점, 밑줄, 하이픈만 사용할 수 있습니다"
  }

  return ""
}

export function getDefaultProfile(user: ProfileSeedUser): UserProfile {
  const emailName = user.email?.split("@")[0] ?? ""
  const username = normalizeUsername(emailName) || `user-${user.uid.slice(0, 6)}`

  return {
    userId: user.uid,
    username,
    displayName: user.displayName?.trim() || "MyLink User",
    bio: "한 곳에서 나를 소개하고, 자주 사용하는 링크를 모아두는 개인 프로필 페이지입니다.",
  }
}
