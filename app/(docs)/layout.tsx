"use client"
import "@/styles/globals.css"
import { docsConfig } from "@/configs/docs"
import * as React from "react"
import Link from "next/link"

import { Icons } from "@/components/icons"
import { DocsMainNav } from "@/components/layouts/docs-main-nav"
import { DocsSearch } from "@/components/searchs/docs-search"
import { SiteFooter } from "@/components/layouts/site-footer"
import { ThemeToggle } from "@/components/theme-toggle"



import { useSelectedLayoutSegment } from "next/navigation"

import { DocsMobileNav } from "@/components/layouts/docs-mobile-nav"
import { useRouter } from 'next/router';
import { Breadcrumbs } from "@/components/pagers/breadcrumbs"
import { toTitleCase } from "@/lib/utils"
interface DocsLayoutProps {
  children: React.ReactNode

}

export default function DocsLayout({ children }: DocsLayoutProps) {

  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState(false)
  const openMobileMenu = () => {
    setShowMobileMenu(true);
  };
  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };
  return (
<>
  <div className="sticky top-0 z-40 w-full lg:border-b border-muted bg-background flex-none">
  <div className="max-w-8xl mx-auto">
    <div className="flex py-4 items-center justify-between border-b border-muted lg:border-0 lg:px-8 mx-4 lg:mx-0">
      <div className="flex space-x-4">
        <DocsMainNav items={docsConfig.mainNav} />
      </div>
      <div className="flex items-center justify-between text-center space-x-4">
        <DocsSearch />
        <ThemeToggle className="" />
      </div>
    </div>
    <div className="lg:hidden flex p-4 border-b border-muted items-center justify-between sm:space-x-0 ">
      <div className="flex">
        <button className="flex items-center space-x-2">
          {showMobileMenu ? (
            <Icons.close
              onClick={closeMobileMenu}
              className="hover:text-primary"
            />
          ) : (
            <span
              onClick={openMobileMenu}
              className="font-bold text-muted-foreground"
            >
              <Icons.menu />
            </span>
          )}
        </button>
        <div className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0 space-x-3">
          <Breadcrumbs
            segments={[
              {
                title: toTitleCase(docsConfig.sidebarNav[0].title),
                href: `/docs/${docsConfig.sidebarNav[0].title.toLowerCase()}`,
              },
            ]}
          />
          {/* 
          <div className="flex items-center space-x-3 ">
            <span>{sidebarNav.title}</span>
          </div>
          <div className="font-semibold truncate">{SidebarNav.item}</div>
          */}
        </div>
        {showMobileMenu && docsConfig.mainNav && docsConfig.sidebarNav && (
          <DocsMobileNav
            closeMobileMenu={closeMobileMenu}
            sideItems={docsConfig.sidebarNav}
            items={docsConfig.mainNav}
          />
        )}
      </div>
    </div>
  </div>
  </div>


  <main className="mx-auto max-w-8xl px-4 sm:px-6 md:px-8">
    {children}
  </main>
  {/* 
  <div className="fixed-gradient">
    <div className="fixed footer-gradient right-0 top-0 h-full w-3/5" />
  </div>
  */}
</>
  )
}