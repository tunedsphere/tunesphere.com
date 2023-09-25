import { docsConfig } from "@/configs/docs"
import { DocsSidebarNav } from "@/components/sidebar-nav"
import { SiteHeader } from "@/components/layouts/site-header"
import { SiteFooter } from "@/components/layouts/site-footer"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <>
    <SiteHeader />
    <main className="mx-auto max-w-7xl pt-24 container flex-1 px-8">
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