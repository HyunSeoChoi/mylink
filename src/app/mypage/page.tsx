"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"

import { LinkList } from "@/components/link-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { links as initialLinks, type LinkItem } from "@/data/links"

const linkColors = ["bg-[#FF8FAB]", "bg-[#8DD3C7]", "bg-[#A78BFA]", "bg-white"]

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

export default function MyPage() {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedUrl = url.trim()

    if (!trimmedTitle) {
      setError("제목을 입력해주세요")
      return
    }

    if (!trimmedUrl) {
      setError("주소를 입력해주세요")
      return
    }

    const validUrl = getValidUrl(trimmedUrl)

    if (!validUrl) {
      setError("올바른 주소를 입력해주세요")
      return
    }

    const nextLink: LinkItem = {
      id: Date.now(),
      title: trimmedTitle,
      description: validUrl,
      url: validUrl,
      icon: getIcon(trimmedTitle) || "LK",
      color: linkColors[links.length % linkColors.length],
    }

    setLinks((currentLinks) => [...currentLinks, nextLink])
    setTitle("")
    setUrl("")
    setError("")
  }

  return (
    <main className="min-h-screen bg-[#7dd3fc] px-4 py-6 text-black sm:px-6">
      <section className="mx-auto flex w-full max-w-2xl flex-col gap-5">
        <header className="rounded-[12px] border-[3px] border-black bg-[#FEF08A] p-5 shadow-[6px_6px_0_#000]">
          <p className="text-sm font-black uppercase tracking-[0.18em]">
            MyLink Admin
          </p>
          <h1 className="mt-2 text-4xl font-black">내 링크 관리</h1>
          <p className="mt-3 text-base font-semibold leading-7">
            새 링크를 추가하면 아래 목록에 바로 나타납니다. 아직 데이터베이스
            저장 전이라 새로고침하면 추가한 링크는 사라집니다.
          </p>
        </header>

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
                className="h-12 rounded-[12px] border-[3px] border-black bg-[#5B5FC7] text-base font-black text-white shadow-[4px_4px_0_#000] hover:bg-[#4b4fb0] focus-visible:ring-4 focus-visible:ring-[#A78BFA]"
              >
                추가하기
              </Button>
            </form>
          </CardContent>
        </Card>

        <section className="rounded-[12px] border-[3px] border-black bg-[#FEF08A] p-4 shadow-[6px_6px_0_#000] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black">링크 목록</h2>
            <span className="rounded-full border-[3px] border-black bg-white px-3 py-1 text-sm font-black">
              {links.length}개
            </span>
          </div>
          <LinkList links={links} />
        </section>

        <Link
          href="/"
          className="self-center rounded-[12px] border-[3px] border-black bg-white px-4 py-2 text-sm font-black shadow-[4px_4px_0_#000]"
        >
          공개 페이지 보기
        </Link>
      </section>
    </main>
  )
}
