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
  <header className="sticky top-0 z-40 w-full border-b border-muted bg-background">
    <div className="flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
      <div className="flex space-x-4">
        <DocsMainNav items={docsConfig.mainNav} />
      </div>
      <div className="flex items-center justify-between text-center space-x-4">
        <DocsSearch />
        <ThemeToggle className="" />
      </div>
    </div>
  </header>
  <header className="lg:hidden sticky top-0 z-40 w-full border-b border-muted bg-background">
    <div className="container flex h-16 items-center justify-between sm:space-x-0 max-w-7xl px-4 ">
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
  </header>
  <main className="mx-auto max-w-7xl container flex-1">
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