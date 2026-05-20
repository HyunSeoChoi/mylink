import { LinkList } from "@/components/link-list"
import { links } from "@/data/links"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#7dd3fc] px-4 py-6 text-black sm:px-6">
      <section className="mx-auto flex min-h-[calc(100vh-48px)] w-full items-center justify-center">
        <div className="w-full rounded-[12px] border-[3px] border-black bg-[#FEF08A] p-4 shadow-[6px_6px_0_#000] sm:w-[80%] sm:max-w-[480px] sm:p-6 lg:w-[400px]">
          <header className="text-center">
            <div className="mx-auto mb-5 flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full border-[3px] border-black bg-[#ff8fab] shadow-[6px_6px_0_#000]">
              <span className="text-4xl font-black">HS</span>
            </div>
            <p className="text-sm font-black uppercase tracking-[0.18em]">
              MyLink
            </p>
            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              최현서
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base font-semibold leading-7">
              한 곳에서 나를 소개하고, 자주 사용하는 링크를 모아두는
              개인 프로필 페이지입니다.
            </p>
          </header>

          <LinkList links={links} />

          <footer className="pt-6 text-center text-sm font-black">
            yourname.vercel.app
          </footer>
        </div>
      </section>
    </main>
  )
}
