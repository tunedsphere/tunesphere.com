import './layouts.css'

import * as React from 'react'
import Link from 'next/link'
import type { ShopMainNavItem } from '@/types'
import { Icon } from '@/components/icon'

import { siteConfig } from '@/configs/site'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { formatTitleWithUnderscores } from '@/lib/utils'
interface ShopMainNavProps {
  items: ShopMainNavItem[]
}

export function ShopMainNav({ items }: ShopMainNavProps) {
  return (
    <div className="z-1000 hidden gap-6  lg:flex">
      <Link
        aria-label="Explore & Shop"
        href="/shop"
        className="hidden items-center space-x-2 lg:flex"
      >
        <span className="hover:none hidden text-lg font-semibold leading-6 lg:inline-block">
          Explore & Shop
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="scrollable-container overflow-y-clip overflow-x-scroll">
          {items?.[0]?.items ? (
            <NavigationMenuItem>
              <Link href="/shop">
                <NavigationMenuTrigger className="z-1000 h-auto bg-background-shopNavLink ">
                  {items[0].title}
                </NavigationMenuTrigger>
              </Link>
              <NavigationMenuContent className="z-1000 shadow-xl ">
                <ul className="grid gap-3 border-muted p-6 md:w-[26rem] lg:w-[48rem] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        aria-label="Home"
                        className="flex w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none"
                        href="/"
                      >
                        <Icon name="logo" className="left-0 z-100 h-14 w-14" />
                        <div className="mb-2 mt-4 text-lg font-semibold leading-6 tracking-tighter">
                          {siteConfig.name}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {siteConfig.description}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <div className="gap-4 bg-background-shopNavLink/50 p-6">
                    {items[0].items.map((item) => (
                      <ListItem
                        className="flex-col"
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </div>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : null}
          {items
            ?.filter((item) => item.title !== items[0]?.title)
            .map((item) =>
              item?.items ? (
                <NavigationMenuItem key={item.title}>
                  <Link href={`/shop/c/${encodeURIComponent(item.title)}`}>
                    <NavigationMenuTrigger className="focus h-auto bg-background-shopNavLink capitalize">
                      {formatTitleWithUnderscores(item.title)}
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent className="shadow-xl">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[790px]">
                      {item.items.map((item) => (
                        <ListItem
                          className=""
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                item.href && (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), 'h-auto')}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              ),
            )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-background-shopNavLink hover:text-accent-foreground focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
