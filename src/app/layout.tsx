import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MyLink - 나만의 링크 페이지",
    template: "%s | MyLink",
  },
  description:
    "나만의 링크 페이지를 만들고, 공유하고, 클릭 통계까지 확인하는 MyLink 프로젝트입니다.",
  openGraph: {
    title: "MyLink - 나만의 링크 페이지",
    description:
      "링크 관리, 개인 URL, 클릭 통계를 한 곳에서 관리하는 링크 페이지입니다.",
    url: siteUrl,
    siteName: "MyLink",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MyLink preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyLink - 나만의 링크 페이지",
    description:
      "링크 관리, 개인 URL, 클릭 통계를 한 곳에서 관리하는 링크 페이지입니다.",
    images: ["/opengraph-image"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
