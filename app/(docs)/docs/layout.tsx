import { docsConfig } from "@/configs/docs"
import { DocsSidebarNav } from "@/components/layouts/docs-sidebar-nav"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {

  return (
    <div className="max-w-8xl mx-auto">
      <aside
        id="docs-sidebar"
        className="fixed hidden lg:block top-[106px] h-[calc(100vh-115px)] inset-0 right-auto w-[19rem] pb-10 pl-8 pr-6 left-[max(0px,calc(50%-45rem))] overflow-y-scroll border-r border-muted "
      >
        <DocsSidebarNav items={docsConfig.sidebarNav} />
      </aside>
      <div className="lg:pl-[19.5rem]">
        <main className="relative max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl-mr[15.5rem] xl:pr-16">
          {children}
        </main>
      </div>
    </div>
  );
}
