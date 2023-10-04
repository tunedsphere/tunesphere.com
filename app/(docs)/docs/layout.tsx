import { docsConfig } from "@/configs/docs"
import { DocsSidebarNav } from "@/components/sidebar-nav"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside id="docs-sidebar" className="fixed top-[106px] z-30 hidden h-[calc(100vh-8rem)] w-full shrink-0 overflow-y-auto border-r border-muted pr-2 md:sticky md:block">
        <DocsSidebarNav items={docsConfig.sidebarNav} />
      </aside>
      {children}
    </div>
  )
}