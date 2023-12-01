"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { slugify } from "@/lib/utils"
import { SidebarNavItem } from "types"
import { cn } from "@/lib/utils"

export interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={cn("pb-8")}>
         <Link href={`/docs/${slugify(item.title)}`}
            key={index}
            className={cn(
              "flex w-full items-center rounded-md p-1 space-x-2 px-3 whitespace-nowrap  mb-2 text-base font-semibold ",
              {
                "hover:bg-muted/50": pathname !== item.href,
                "opacity-100 font-semibold bg-cyan-100 text-cyan-600 dark:text-texthigh dark:bg-violet-900/70": pathname === item.href,
              }
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >

            {item.title}
  
          </Link>
          {item.items ? (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          ) : null}
        </div>
      ))}
    </div>
  ) : null
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[]
  pathname: string | null
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm mr-4 space-y-2">
      {items.map((item, index) =>
        !item.disabled && item.href ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex w-full items-center rounded-md p-1 text-textlow space-x-2 px-3 whitespace-nowrap",
              {
                "hover:text-texthigh hover:bg-muted/50": pathname !== item.href,
                "bg-cyan-200/20 text-cyan-400 dark:text-texthigh dark:bg-violet-900/70 opacity-100 font-semibold hover:none": pathname === item.href,
              }
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
          </Link>
        ) : (
          <span key={index} className="flex w-full cursor-not-allowed items-center rounded-md p-1 text-textlow hover:text-texthigh hover:bg-muted/50 space-x-2 px-3 whitespace-nowrap">
            {item.title}
          </span>
        )
      )}
    </div>
  ) : null
}