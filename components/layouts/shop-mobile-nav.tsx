'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ShopMainNavItem, SidebarNavItem } from '@/types'

import { siteConfig } from '@/configs/site'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Icon } from '@/components/icon'
import { formatTitleWithUnderscores } from '@/lib/utils'

interface ShopMobileNavProps {
  shopMainNavItems: ShopMainNavItem[]
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
        <div className="flex items-center">
          <Button
            variant="ghostColor"
            className="col-span-1 grow-0 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 2xl:hidden"
          >
            <Icon name="menu" className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <span className="ml-2 mt-1 block align-baseline 2xl:hidden">
            Categories
          </span>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7 pt-16">
          <Link
            aria-label="Home"
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Icon name="logo" className="mr-2 h-12 w-12" aria-hidden="true" />
            <span className="text-xl font-bold"> Back</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100dvh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Accordion type="single" collapsible className="w-full">
              {shopMainNavItems?.map((item, index) => (
                <AccordionItem value={item.title} key={index}>
                  <AccordionTrigger className="text-sm font-semibold capitalize leading-6 decoration-transparent hover:text-primary">
                    {formatTitleWithUnderscores(item.title)}
                  </AccordionTrigger>
                  <AccordionContent className="">
                    <div className="flex flex-col space-y-2">
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
                          <div key={index} className=" transition-colors">
                            {formatTitleWithUnderscores(item.title)}
                          </div>
                        ),
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
        'hover:secondary-foreground/80 focus:secondary-foreground/80 rounded-md py-1 pl-4 transition-colors hover:bg-secondary/80 focus:bg-secondary/80',
        pathname === href && '',
        disabled && 'pointer-events-none opacity-60',
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  )
}
