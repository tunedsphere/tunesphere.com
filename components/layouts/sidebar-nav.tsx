"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { SidebarNavItem } from "@/types"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

export interface SidebarNavProps {
  items: SidebarNavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()

  if (!items?.length) return null

  return (
    <div className="flex w-full flex-col gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon ?? "chevronLeft"]

        return item.href ? (
          <Link
            key={index}
            href={item.href}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            <span
              className={cn(
                "group flex w-full items-center rounded-md px-2 py-1 hover:text-primary leading-6 font-medium",
                pathname === item.href
                  ? "bg-accent-1 font-medium text-primary"
                  : "text-muted-foreground",
                item.disabled && "pointer-events-none opacity-60"
              )}
            >
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
          >
            {item.title}
          </span>
        )
      })}
    </div>
  )
}
