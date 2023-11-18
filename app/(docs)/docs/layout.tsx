import { docsConfig } from "@/configs/docs"
import { DocsSidebarNav } from "@/components/layouts/docs-sidebar-nav"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {

  return (
    <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside id="docs-sidebar" className="fixed top-[106px] z-30 hidden w-full shrink-0 overflow-y-auto border-r border-muted pr-2 md:sticky md:block">
        <DocsSidebarNav items={docsConfig.sidebarNav} />
      </aside>

        <div className="right-gradient fixed z-10"> </div>
      {children}
    </div>
  )
}