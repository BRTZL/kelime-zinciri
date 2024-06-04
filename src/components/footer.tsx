import { WholeWord } from "lucide-react"

import { siteConfig } from "@/config/siteConfig"
import { ModeToggle } from "@/components/mode-toggle"

export function Footer() {
  return (
    <footer>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <WholeWord className="hidden md:block" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.personal}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Bartu OZEL
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}
