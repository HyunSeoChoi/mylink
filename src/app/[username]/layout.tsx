import type { Metadata } from "next"

type UsernameLayoutProps = {
  children: React.ReactNode
  params: Promise<{
    username: string
  }>
}

export async function generateMetadata({
  params,
}: UsernameLayoutProps): Promise<Metadata> {
  const { username } = await params
  const decodedUsername = decodeURIComponent(username)

  return {
    title: `MyLink - ${decodedUsername}`,
    description: `${decodedUsername}의 링크와 프로필을 한 곳에서 확인하세요.`,
    openGraph: {
      title: `MyLink - ${decodedUsername}`,
      description: `${decodedUsername}의 링크와 프로필을 한 곳에서 확인하세요.`,
      type: "profile",
      images: [
        {
          url: `/${decodedUsername}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${decodedUsername} MyLink preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `MyLink - ${decodedUsername}`,
      description: `${decodedUsername}의 링크와 프로필을 한 곳에서 확인하세요.`,
      images: [`/${decodedUsername}/opengraph-image`],
    },
  }
}

export default function UsernameLayout({ children }: UsernameLayoutProps) {
  return children
}
