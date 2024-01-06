import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/icon'

interface BreadcrumbsProps {
  segments: {
    title: string
    href: string
  }[]
  separator?: React.ComponentType<{ className?: string }>
}

export function Breadcrumbs({ segments, separator }: BreadcrumbsProps) {
  const SeparatorIcon = separator ?? <Icon name="chevron-right"></Icon>

  return (
    <nav
      aria-label="breadcrumbs"
      className="flex items-center justify-center overflow-hidden overflow-x-auto px-2 text-sm font-medium text-muted-foreground"
    >
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1

        return (
          <React.Fragment key={segment.href}>
            <Link
              aria-current={isLastSegment ? 'page' : undefined}
              href={segment.href}
              className={cn(
                'underline-primary truncate underline-offset-2 transition-colors hover:underline',
                isLastSegment ? 'text-soft-foreground pointer-events-none' : '',
              )}
            >
              {segment.title}
            </Link>
            {!isLastSegment && (
              <Icon
                name="chevron-right"
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
