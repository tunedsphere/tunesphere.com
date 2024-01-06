'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { slugify } from '@/lib/utils'
import { SidebarNavItem } from 'types'
import { cn } from '@/lib/utils'

export interface DocsSidebarNavProps {
  items: SidebarNavItem[]
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname()

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={cn('pb-8')}>
          <Link
            href={`/docs/${slugify(item.title)}`}
            key={index}
            className={cn(
              'mb-2 flex w-full items-center space-x-2 whitespace-nowrap rounded-md p-1 px-3 text-base font-semibold ',
              {
                'hover:bg-muted/50': pathname !== item.href,
                'bg-cyan-100 text-cyan-600 opacity-100 dark:bg-violet-900/70 dark:text-texthigh':
                  pathname === item.href,
              },
            )}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
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
    <div className="mr-4 grid grid-flow-row auto-rows-max space-y-2 text-sm">
      {items.map((item, index) =>
        !item.disabled && item.href ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              'flex w-full items-center space-x-2 whitespace-nowrap rounded-md p-1 px-3 text-textlow',
              {
                'hover:bg-muted/50 hover:text-texthigh': pathname !== item.href,
                'hover:none bg-cyan-200/20 font-semibold text-cyan-400 opacity-100 dark:bg-violet-900/70 dark:text-texthigh':
                  pathname === item.href,
              },
            )}
            target={item.external ? '_blank' : ''}
            rel={item.external ? 'noreferrer' : ''}
          >
            {item.title}
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center space-x-2 whitespace-nowrap rounded-md p-1 px-3 text-textlow hover:bg-muted/50 hover:text-texthigh"
          >
            {item.title}
          </span>
        ),
      )}
    </div>
  ) : null
}
