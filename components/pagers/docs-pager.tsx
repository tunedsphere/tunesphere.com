import Link from 'next/link'

import { cn, truncate } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icon } from '@/components/icon'

interface DocsPagerItem {
  title?: string | undefined
  slug: string
}
interface DocsPagerProps extends React.HTMLAttributes<HTMLDivElement> {
  currentItem: DocsPagerItem
  allItems: DocsPagerItem[]
}

export function DocsPager({
  currentItem,
  allItems,
  className,
  ...props
}: DocsPagerProps) {
  const pager = getPager(currentItem, allItems)

  if (!pager) {
    return null
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between border-t border-muted py-4',
        className,
      )}
      {...props}
    >
      {pager?.next ? (
        <Link
          aria-label={pager.next.slug}
          href={pager.next.slug}
          className={`text-textlow hover:bg-violet-900/20 hover:text-violet-400 ${cn(
            buttonVariants({ variant: 'ghost' }),
          )}`}
        >
          <Icon
            name="chevron-left"
            className="mr-2 h-4 w-4"
            aria-hidden="true"
          />
          {pager.next.title ? truncate(pager.next.title, 20) : null}
        </Link>
      ) : null}
      {pager?.prev ? (
        <Link
          aria-label={pager.prev.slug}
          href={pager.prev.slug}
          className={`text-textlow hover:bg-violet-900/20 hover:text-violet-400 ${cn(
            buttonVariants({ variant: 'ghost' }),
            '',
          )}`}
        >
          {pager.prev.title ? truncate(pager.prev.title, 20) : null}
          <Icon
            name="chevron-right"
            className="ml-2 h-4 w-4"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </div>
  )
}

export function getPager(
  currentItem: DocsPagerItem,
  allItems: DocsPagerItem[],
) {
  const flattenedLinks = allItems.flat()
  const activeIndex = flattenedLinks.findIndex(
    (link) => currentItem.slug === link?.slug,
  )
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null
  return {
    prev,
    next,
  }
}
