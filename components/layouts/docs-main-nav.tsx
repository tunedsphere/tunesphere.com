'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { MainNavItem } from 'types'
import { siteConfig } from '@/configs/site'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/icon'

interface DocsMainNavProps {
  items: MainNavItem[]
}

export function DocsMainNav({ items }: DocsMainNavProps) {
  const segment = useSelectedLayoutSegment()
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icon name="logo" className="h-8 w-8" />
        <span className="inline-block text-base font-bold">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-4 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center rounded-md px-3 font-semibold transition-colors hover:text-foreground/80 lg:text-sm lg:leading-6',
                item.href.startsWith(`/${segment}`)
                  ? ' hover:none bg-cyan-200/20 font-semibold text-cyan-400 dark:bg-violet-900/20 dark:text-violet-400'
                  : 'hover:bg-muted/50',
                item.disabled && 'cursor-not-allowed opacity-80',
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
