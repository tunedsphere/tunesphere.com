"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ShopMainNavItem, SidebarNavItem } from "@/types"

import { siteConfig } from "@/configs/site"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"

interface ShopMobileNavProps {
  shopMainNavItems?: ShopMainNavItem[]
  sidebarNavItems: SidebarNavItem[]
}

export function ShopMobileNav({
  shopMainNavItems,
  sidebarNavItems,
}: ShopMobileNavProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="nav"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0 bg-background-shop text-textdark">
        <div className="px-7 pt-7">
          <Link
            aria-label="Home"
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Icons.logo className="mr-2 h-12 w-12" aria-hidden="true" />
            <span className="text-xl font-bold">{siteConfig.name}</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100dvh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Accordion type="single" collapsible className="w-full underline-offset-4 decoration-primary">
              {shopMainNavItems?.map((item, index) => (
                <AccordionItem value={item.title} key={index}>
                  <AccordionTrigger className="text-sm capitalize text-textdark hover:text-primary decoration-transparent leading-6 font-semibold focus:text-primary focus:font-bold focus:text-base">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-textdark">
                    <div className="flex flex-col space-y-2 text-textdark">
                      {item.items?.map((subItem, index) =>
                        subItem.href ? (
                          <MobileLink
                            key={index}
                            href={String(subItem.href)}
                            pathname={pathname}
                            setIsOpen={setIsOpen}
                            disabled={subItem.disabled}
                          >
                            {subItem.title}
                          </MobileLink>
                        ) : (
                          <div
                            key={index}
                            className="text-textdark transition-colors"
                          >
                            {item.title}
                          </div>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps {
  children?: React.ReactNode
  href: string
  disabled?: boolean
  pathname: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-textdark/80 transition-colors hover:text-primary hover:bg-muted/30 rounded-md pl-4 py-1",
        pathname === href && "text-textdark",
        disabled && "pointer-events-none opacity-60"
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  )
}
