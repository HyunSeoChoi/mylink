const links = [
  {
    title: "Instagram",
    description: "Daily photos and campus moments",
    href: "https://instagram.com",
    color: "bg-[#FF8FAB]",
  },
  {
    title: "Blog",
    description: "Notes about study, projects, and ideas",
    href: "https://velog.io",
    color: "bg-[#8DD3C7]",
  },
  {
    title: "Portfolio",
    description: "Projects, experiments, and contact info",
    href: "https://github.com/HyunSeoChoi",
    color: "bg-[#A78BFA]",
  },
  {
    title: "GitHub Repository",
    description: "Source code for this MyLink practice project",
    href: "https://github.com/HyunSeoChoi/mylink",
    color: "bg-white",
  },
];

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

          <nav aria-label="profile links" className="mt-7 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`group flex min-h-20 items-center justify-between rounded-[12px] border-[3px] border-black px-4 py-3 shadow-[4px_4px_0_#000] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#000] focus:outline-none focus:ring-4 focus:ring-white ${link.color}`}
              >
                <span className="text-left">
                  <span className="block text-lg font-black">
                    {link.title}
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-6">
                    {link.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="ml-4 text-2xl font-black transition group-hover:translate-x-1"
                >
                  &gt;
                </span>
              </a>
            ))}
          </nav>

          <footer className="pt-6 text-center text-sm font-black">
            yourname.vercel.app
          </footer>
        </div>
      </section>
    </main>
  );
}
