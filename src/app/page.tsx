const links = [
  {
    title: "Instagram",
    description: "Daily photos and campus moments",
    href: "https://instagram.com",
  },
  {
    title: "Blog",
    description: "Notes about study, projects, and ideas",
    href: "https://velog.io",
  },
  {
    title: "Portfolio",
    description: "Projects, experiments, and contact info",
    href: "https://github.com/HyunSeoChoi",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#1f2933]">
      <section className="mx-auto flex min-h-screen w-full max-w-xl flex-col px-5 py-8 sm:px-8">
        <div className="flex flex-1 flex-col justify-center gap-8">
          <header className="text-center">
            <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-[#2d6a73] shadow-lg">
              <span className="text-4xl font-bold text-white">HS</span>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2d6a73]">
              MyLink
            </p>
            <h1 className="mt-3 text-4xl font-bold text-[#111827] sm:text-5xl">
              최현서
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#4b5563]">
              한 곳에서 나를 소개하고, 자주 사용하는 링크를 모아두는
              개인 프로필 페이지입니다.
            </p>
          </header>

          <nav aria-label="profile links" className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-20 items-center justify-between rounded-lg border border-[#d7cdb8] bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2d6a73] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#2d6a73]/20"
              >
                <span className="text-left">
                  <span className="block text-lg font-semibold text-[#111827]">
                    {link.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-[#6b7280]">
                    {link.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="ml-4 text-2xl text-[#2d6a73] transition group-hover:translate-x-1"
                >
                  &gt;
                </span>
              </a>
            ))}
          </nav>
        </div>

        <footer className="pt-8 text-center text-sm text-[#6b7280]">
          yourname.vercel.app
        </footer>
      </section>
    </main>
  );
}
