export type LinkItem = {
  id: number
  title: string
  description: string
  url: string
  icon: string
  color: string
}

export const links: LinkItem[] = [
  {
    id: 1,
    title: "Instagram",
    description: "Daily photos and campus moments",
    url: "https://instagram.com",
    icon: "IG",
    color: "bg-[#FF8FAB]",
  },
  {
    id: 2,
    title: "Blog",
    description: "Notes about study, projects, and ideas",
    url: "https://velog.io",
    icon: "BL",
    color: "bg-[#8DD3C7]",
  },
  {
    id: 3,
    title: "Portfolio",
    description: "Projects, experiments, and contact info",
    url: "https://github.com/HyunSeoChoi",
    icon: "PF",
    color: "bg-[#A78BFA]",
  },
  {
    id: 4,
    title: "GitHub Repository",
    description: "Source code for this MyLink practice project",
    url: "https://github.com/HyunSeoChoi/mylink",
    icon: "GH",
    color: "bg-white",
  },
]
