import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface BreadcrumbsProps {
  segments: {
    title: string
    href: string
  }[]
  separator?: React.ComponentType<{ className?: string }>
}

export function Breadcrumbs({ segments, separator }: BreadcrumbsProps) {
  const SeparatorIcon = separator ?? Icons.chevronRight

  return (
    <nav
      aria-label="breadcrumbs"
      className="flex items-center justify-center text-sm font-medium text-muted-foreground overflow-x-auto overflow-hidden px-2"
    >
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1

        return (
          <React.Fragment key={segment.href}>
            <Link
              aria-current={isLastSegment ? "page" : undefined}
              href={segment.href}
              className={cn(
                "underline-textdark truncate underline-offset-2 transition-colors hover:text-textdark hover:underline",
                isLastSegment
                  ? "pointer-events-none text-theme-500"
                  : "text-textdark"
              )}
            >
              {segment.title}
            </Link>
            {!isLastSegment && (
              <Icons.chevronRight
                className="mx-1 h-4 w-4 sm:mx-2"
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
