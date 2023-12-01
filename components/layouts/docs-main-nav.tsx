"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem} from "types"
import { siteConfig } from "@/configs/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons/icons"

interface DocsMainNavProps {
  items: MainNavItem[]
}

export function DocsMainNav({ items }: DocsMainNavProps) {
  const segment = useSelectedLayoutSegment()
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-8 w-8"/>
        <span className="font-bold inline-block text-base">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-4 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center font-semibold transition-colors hover:text-foreground/80 lg:text-sm lg:leading-6 px-3 rounded-md",
                item.href.startsWith(`/${segment}`)
                  ? " text-cyan-400 dark:text-violet-600 bg-cyan-200/20  dark:bg-violet-900/20 font-semibold hover:none"
                  : "hover:bg-muted/50",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  )
}