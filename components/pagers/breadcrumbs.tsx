import * as React from "react"
import Link from "next/link"
import { Icons } from "@/components/icons"

import { cn } from "@/lib/utils"

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
      className="flex justify-center items-center text-sm font-medium text-muted-foreground"
    >
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1

        return (
          <React.Fragment key={segment.href}>
            <Link
              aria-current={isLastSegment ? "page" : undefined}
              href={segment.href}
              className={cn(
                "truncate transition-colors hover:text-textdark hover:underline underline-offset-2 underline-textdark sm:text-lg",
                isLastSegment
                  ? "pointer-events-none text-muted-foreground sm:text-lg"
                  : "text-foreground sm:text-lg"
              )}
            >
              {segment.title}
            </Link>
            {!isLastSegment && (
              <Icons.chevronRight className="sm:mx-2 mx-1 h-4 w-4" aria-hidden="true" />
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
