import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LinkItem } from "@/data/links"

type LinkListProps = {
  links: LinkItem[]
}

export function LinkList({ links }: LinkListProps) {
  return (
    <nav aria-label="profile links" className="mt-7 flex flex-col gap-3">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="group block focus:outline-none focus-visible:ring-4 focus-visible:ring-white"
        >
          <Card
            className={cn(
              "min-h-20 gap-0 rounded-[12px] border-[3px] border-black px-0 py-0 text-black shadow-[4px_4px_0_#000] ring-0 transition group-hover:-translate-y-0.5 group-hover:shadow-[6px_6px_0_#000]",
              link.color
            )}
          >
            <CardHeader className="grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3">
              <span className="flex size-11 items-center justify-center rounded-full border-[3px] border-black bg-white text-sm font-black">
                {link.icon}
              </span>
              <CardContent className="px-0">
                <CardTitle className="text-lg font-black">
                  {link.title}
                </CardTitle>
                <CardDescription className="mt-1 text-sm font-semibold leading-6 text-black">
                  {link.description}
                </CardDescription>
              </CardContent>
              <CardAction className="col-start-3 row-span-1 row-start-1 self-center text-2xl font-black transition group-hover:translate-x-1">
                &gt;
              </CardAction>
            </CardHeader>
          </Card>
        </a>
      ))}
    </nav>
  )
}
