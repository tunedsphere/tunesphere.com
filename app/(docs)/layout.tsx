import { docsConfig } from "@/configs/docs"

import Link from "next/link"
import { siteConfig } from "@/configs/site"

import { Icons } from "@/components/icons"
import { DocsMainNav } from "@/components/layouts/docs-main-nav"
import { DocsSearch } from "@/components/searchs/docs-search"
import { DocsSidebarNav } from "@/components/sidebar-nav"
import { SiteFooter } from "@/components/layouts/site-footer"
import { ThemeToggle } from "@/components/theme-toggle"
import "@/styles/globals.css"


interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <>
     <header className="sticky top-0 z-40 w-full border-b border-muted bg-background">
        <div className="container flex h-16 items-center space-x-4 justify-between sm:space-x-0 max-w-7xl">
          <div className="flex space-x-4">
        <Link href="/" className="flex items-center space-x-2 md:hidden">
          <Icons.logo />
        </Link>
          <DocsMainNav items={docsConfig.mainNav}>
          <DocsSidebarNav items={docsConfig.sidebarNav} />
          </DocsMainNav>
          </div>
          <div className="flex items-center justify-between text-center space-x-4">
              <DocsSearch/>
              <ThemeToggle/>
          </div>
        </div>
      </header>
    <main className="mx-auto max-w-7xl pt-8 container flex-1 px-8">
      {children}
    </main>
    <div className="fixed-gradient">
  <div className="fixed footer-gradient right-0 top-0 h-full w-3/5" />
  </div>
    <SiteFooter />
    </>
  )
}