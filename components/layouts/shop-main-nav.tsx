import "@styles/globals.css"

import * as React from "react"
import Link from "next/link"
import type { ShopMainNavItem } from "@/types"
import { Icons } from "@components/icons"

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
        <span className="hidden text-lg font-bold text-textdark lg:inline-block">
          Explore & Shop
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {items?.[0]?.items ? (
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-auto text-textdark">
                {items[0].title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        aria-label="Home"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none"
                        href="/"
                      >
                        <Icons.logo
                          className="left-0 z-100"
                          width={100}
                          height={100}
                        ></Icons.logo>

                        <div className="mb-2 mt-4 text-lg font-medium">
                          {siteConfig.name}
                        </div>
                        <p className="text-sm leading-tight text-accent-foreground">
                          {siteConfig.description}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {items[0].items.map((item) => (
                    <ListItem
                      className="bg-theme-50 text-textdark hover:text-theme"
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
          ) : null}
          {items
            ?.filter((item) => item.title !== items[0]?.title)
            .map((item) =>
              item?.items ? (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="h-auto capitalize text-textdark">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {item.items.map((item) => (
                        <ListItem
                          className="hover:bg-accent hover:text-theme-900"
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none transition-colors hover:bg-accent hover:text-accent-foreground">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground ">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
