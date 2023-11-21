import { docsConfig } from "@/configs/docs"
import { DocsSidebarNav } from "@/components/layouts/docs-sidebar-nav"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {

  return (
   <div>
        <div className="max-w-8xl mx-auto">
      <aside id="docs-sidebar" className="fixed hidden lg:block top-[106px] z-20 inset-0 right-auto w-[19rem] pb-10 pl-8 pr-6 h-screen left-[max(0px,calc(50%-45rem))] overflow-y-auto border-r border-muted ">
        <DocsSidebarNav items={docsConfig.sidebarNav} />
      </aside>

     
        <div className="lg:pl-[19.5rem]">
        <main className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl-mr[15.5rem] xl:pr-16">
      
      {children}
      <footer className="text-sm leading-6 mt-12"></footer>
      <div className="fixed z-20 top-[106px] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
        <div className="px-8">
          <h1 className="font-semibold mb-4 text-sm leading-6">On this Page</h1>

    
<ul className="text-sm leading-6">
<li className="block py-1">Structure</li>
</ul>
</div>
      </div>
      </main>
      </div>
    </div>
    </div>
  )
}