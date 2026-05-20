import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  GitBranch,
  LinkIcon,
  UserRound,
} from "lucide-react"

const features = [
  {
    title: "링크 관리",
    description: "자주 쓰는 링크를 로그인 후 한 곳에서 추가, 수정, 삭제합니다.",
    icon: LinkIcon,
    color: "bg-[#8DD3C7]",
  },
  {
    title: "클릭 통계",
    description: "공개 페이지에서 어떤 링크가 많이 눌렸는지 숫자로 확인합니다.",
    icon: BarChart3,
    color: "bg-[#FF8FAB]",
  },
  {
    title: "개인 URL",
    description: "username 기반의 짧은 주소로 나만의 링크 페이지를 공유합니다.",
    icon: UserRound,
    color: "bg-[#A78BFA]",
  },
]

const previewLinks = ["Instagram", "Blog", "Portfolio", "GitHub"]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#7dd3fc] text-black">
      <section className="relative isolate min-h-[92vh] overflow-hidden border-b-[3px] border-black px-4 py-5 sm:px-6">
        <div className="absolute inset-0 -z-10 bg-[#7dd3fc]" />
        <div className="absolute left-1/2 top-8 -z-10 h-[560px] w-[920px] max-w-[calc(100vw-32px)] -translate-x-1/2 rounded-[16px] border-[3px] border-black bg-[#FEF08A] shadow-[10px_10px_0_#000]" />
        <div className="absolute right-[-80px] top-32 -z-10 hidden w-[280px] rotate-6 rounded-[12px] border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_#000] md:block">
          <p className="text-sm font-black uppercase">
            Stats
          </p>
          <p className="mt-3 text-4xl font-black">128</p>
          <p className="mt-1 text-sm font-bold">total clicks</p>
          <div className="mt-4 h-4 rounded-full border-[3px] border-black bg-[#8DD3C7]" />
        </div>
        <div className="absolute bottom-20 left-[-70px] -z-10 hidden w-[260px] -rotate-6 rounded-[12px] border-[3px] border-black bg-[#FF8FAB] p-4 shadow-[6px_6px_0_#000] lg:block">
          <p className="text-sm font-black uppercase">
            /hyunseochoi
          </p>
          <div className="mt-4 flex flex-col gap-3">
            <div className="h-12 rounded-[10px] border-[3px] border-black bg-white" />
            <div className="h-12 rounded-[10px] border-[3px] border-black bg-[#FEF08A]" />
          </div>
        </div>

        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
          <Link href="/" className="text-xl font-black">
            MyLink
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/hyunseochoi"
              className="rounded-[12px] border-[3px] border-black bg-white px-4 py-2 text-sm font-black shadow-[4px_4px_0_#000]"
            >
              예시 보기
            </Link>
            <Link
              href="/mypage"
              className="rounded-[12px] border-[3px] border-black bg-[#5B5FC7] px-4 py-2 text-sm font-black text-white shadow-[4px_4px_0_#000]"
            >
              시작하기
            </Link>
          </div>
        </nav>

        <div className="mx-auto flex min-h-[calc(92vh-72px)] w-full max-w-6xl flex-col items-center justify-center py-16 text-center">
          <p className="rounded-full border-[3px] border-black bg-white px-4 py-2 text-sm font-black uppercase shadow-[4px_4px_0_#000]">
            Link page builder
          </p>
          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
            마이링크
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-bold leading-8 sm:text-2xl">
            나만의 링크 페이지를 만들고, 공유하고, 클릭 통계까지 확인합니다.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/mypage"
              className="inline-flex items-center justify-center gap-2 rounded-[12px] border-[3px] border-black bg-[#5B5FC7] px-6 py-3 text-base font-black text-white shadow-[5px_5px_0_#000]"
            >
              시작하기 <ArrowRight className="size-5" />
            </Link>
            <Link
              href="https://github.com/HyunSeoChoi/mylink"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-[12px] border-[3px] border-black bg-white px-6 py-3 text-base font-black shadow-[5px_5px_0_#000]"
            >
              <GitBranch className="size-5" /> GitHub
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-black bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <article
                  key={feature.title}
                  className={`${feature.color} rounded-[12px] border-[3px] border-black p-5 shadow-[6px_6px_0_#000]`}
                >
                  <div className="flex size-12 items-center justify-center rounded-full border-[3px] border-black bg-white">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="mt-5 text-2xl font-black">
                    {feature.title}
                  </h2>
                  <p className="mt-3 text-base font-bold leading-7">
                    {feature.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FEF08A] px-4 py-14 text-black sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase">
              Preview
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              공유하면 바로 보이는 개인 링크 페이지
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-bold leading-8">
              공개 주소를 소셜 프로필, 포트폴리오, 메시지에 붙이면 방문자는
              링크를 누르고, 소유자는 클릭 통계를 확인할 수 있습니다.
            </p>
            <Link
              href="/hyunseochoi"
              className="mt-7 inline-flex items-center gap-2 rounded-[12px] border-[3px] border-black bg-white px-5 py-3 text-base font-black shadow-[5px_5px_0_#000]"
            >
              예시 페이지 열기 <ArrowRight className="size-5" />
            </Link>
          </div>

          <div className="rounded-[12px] border-[3px] border-black bg-white p-4 shadow-[8px_8px_0_#000]">
            <div className="rounded-[10px] border-[3px] border-black bg-[#7dd3fc] p-4">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full border-[3px] border-black bg-[#FF8FAB] text-2xl font-black shadow-[4px_4px_0_#000]">
                최
              </div>
              <p className="mt-4 text-center text-sm font-black uppercase">
                @hyunseochoi
              </p>
              <h3 className="mt-2 text-center text-3xl font-black">최현서</h3>
              <div className="mt-5 flex flex-col gap-3">
                {previewLinks.map((label, index) => (
                  <div
                    key={label}
                    className={`flex min-h-14 items-center justify-between rounded-[10px] border-[3px] border-black px-4 text-sm font-black shadow-[3px_3px_0_#000] ${
                      index % 2 === 0 ? "bg-[#FEF08A]" : "bg-[#8DD3C7]"
                    }`}
                  >
                    <span>{label}</span>
                    <span>&gt;</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-[3px] border-black bg-black px-4 py-8 text-white sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-bold sm:flex-row sm:items-center sm:justify-between">
          <p>한양대학교 바이브 코딩 · MyLink</p>
          <Link
            href="https://github.com/HyunSeoChoi/mylink"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2"
          >
            <GitBranch className="size-4" /> GitHub Repository
          </Link>
        </div>
      </footer>
    </main>
  )
}
