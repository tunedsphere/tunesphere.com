import { docsConfig } from "@/configs/docs"
import { DocsSidebarNav } from "@/components/sidebar-nav"
import { SiteHeader } from "@/components/layouts/site-header"
import { SiteFooter } from "@/components/layouts/site-footer"

import { siteConfig } from "@/configs/site"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { DocsSearch } from "@/components/searchs/docs-search"


interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <>
     <header className="sticky top-0 z-40 w-full border-b border-muted bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 max-w-7xl">
          <MainNav items={docsConfig.mainNav}>
          <DocsSidebarNav items={docsConfig.sidebarNav} />
          </MainNav>
          <div className="flex flex-1 items-center space-x-4 sm:justify-end">
            <div className="flex-1 sm:grow-0">
              <DocsSearch />
            </div>
          </div>
        </div>
      </header>
    <main className="mx-auto max-w-7xl pt-8 container flex-1 px-8">
    <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-muted py-6 px-4 md:sticky md:block lg:py-10">
      <DocsSidebarNav items={docsConfig.sidebarNav} />
      </aside>
      {children}
    </div>
    </main>
    <SiteFooter />
    </>
  )
}