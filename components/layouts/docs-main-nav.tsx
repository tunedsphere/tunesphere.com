"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem, SidebarNavItem } from "types"
import { siteConfig } from "@/configs/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { DocsMobileNav } from "@/components/layouts/docs-mobile-nav"
import { docsConfig } from "@/configs/docs"
interface DocsMainNavProps {
  items: MainNavItem[]
  sideItems: SidebarNavItem[]
}

export function DocsMainNav({ items, sideItems }: DocsMainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState(false)
  const openMobileMenu = () => {
    setShowMobileMenu(true);
  };
  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };
  
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo className="h-8 w-8 text-primary"/>
        <span className="hidden font-bold sm:inline-block text-lg">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground underline underline-offset-4 decoration-primary font-semibold"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        
      >
        {showMobileMenu ? <Icons.close 
        onClick={closeMobileMenu} className="hover:text-primary"/> : <span onClick={openMobileMenu} className="font-bold">Menu</span>}
      </button>
      {showMobileMenu && items && sideItems && (
        <DocsMobileNav closeMobileMenu={closeMobileMenu} sideItems={docsConfig.sidebarNav} 
        items={items} >
          </DocsMobileNav>
      )}
    </div>
  )
}