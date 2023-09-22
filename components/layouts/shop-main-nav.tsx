import "@/styles/globals.css"

import * as React from "react"
import Link from "next/link"
import type { ShopMainNavItem } from "@/types"
import { Icons } from "@/components/icons"

import { siteConfig } from "@/configs/site"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

interface ShopMainNavProps {
  items?: ShopMainNavItem[]
}

export function ShopMainNav({ items }: ShopMainNavProps) {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link
        aria-label="Explore & Shop"
        href="/shop"
        className="hidden items-center space-x-2 lg:flex"
      >
        <span className="hidden text-lg text-textdark lg:inline-block leading-6 font-semibold">
          Explore & Shop
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {items?.[0]?.items ? (
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-auto text-textdark bg-theme-200">
                {items[0].title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-theme-100 shadow-xl">
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[790px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        aria-label="Home"
                        className="flex w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-theme-50/50 to-theme-100 p-6 no-underline outline-none"
                        href="/"
                      >
                        <Icons.logo
                          className="left-0 z-100 text-textdark"
                          width={72}
                          height={72}
                        ></Icons.logo>
                        <div className="mb-2 mt-4 text-lg leading-6 tracking-tighter font-semibold text-textdark">
                          {siteConfig.name}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {siteConfig.description}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <div className="bg-theme-50 gap-4 p-6">
                  {items[0].items.map((item) => (
                    <ListItem
                      className="flex-col text-textdark hover:text-theme-500 "
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
                  <NavigationMenuTrigger className="h-auto capitalize text-textdark bg-theme-200">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-theme-100 shadow-xl">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[790px]">
                      {item.items.map((item) => (
                        <ListItem
                          className="hover:bg-theme-200 hover:text-theme-900 text-textdark"
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
                        className={cn(navigationMenuTriggerStyle(), "h-auto")}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )
            )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-theme-200 hover:text-accent-foreground focus:bg-theme-200 focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
