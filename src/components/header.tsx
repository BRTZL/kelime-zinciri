import { WholeWord } from "lucide-react"

import { siteConfig } from "@/config/siteConfig"

export function Header() {
  return (
    <header className="bg-background container z-40">
      <div className="flex h-20 items-center justify-between py-6">
        <div className="flex gap-4 md:gap-6">
          <WholeWord />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </div>
      </div>
    </header>
  )
}
