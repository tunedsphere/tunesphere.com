import { docsConfig } from "@/configs/docs"
import { DocsSidebarNav } from "@/components/sidebar-nav"
import { SiteFooter } from "@/components/layouts/site-footer"

import { DocsMainNav } from "@/components/layouts/docs-main-nav"
import { DocsSearch } from "@/components/searchs/docs-search"
import { ThemeToggle } from "@/components/theme-toggle"
import "@/styles/globals.css"


interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <>
     <header className="sticky top-0 z-40 w-full border-b border-muted bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 max-w-7xl">
          <DocsMainNav items={docsConfig.mainNav}>
          <DocsSidebarNav items={docsConfig.sidebarNav} />
          </DocsMainNav>
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