import Link from "next/link"

import { cn, truncate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface MdxPagerItem {
  title?: string | undefined
  slug: string;
}
interface MdxPagerProps extends React.HTMLAttributes<HTMLDivElement> {
  currentItem: MdxPagerItem
  allItems: MdxPagerItem[]
}

export function MdxPager({
  currentItem,
  allItems,
  className,
  ...props
}: MdxPagerProps) {
  const pager = getPager(currentItem, allItems)

  if (!pager) {
    return null
  }

  return (
    <div
      className={cn("flex items-center justify-between border-t border-muted py-4", className)}
      {...props}
    >
      {pager?.next ? (
        <Link
          aria-label="Next post"
          href={pager.next.slug}
          className={`hover:bg-muted/30 hover:text-primary ${cn(buttonVariants({ variant: "ghost" }))}`}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          {pager.next.title ? truncate(pager.next.title, 20) : null}
        </Link>
      ) : null}
      {pager?.prev ? (
        <Link
          aria-label="Previous post"
          href={pager.prev.slug}
          className={`hover:bg-muted/30 hover:text-primary ${cn(buttonVariants({ variant: "ghost" }), "ml-auto")}`}
        >
        {pager.prev.title ? truncate(pager.prev.title, 20) : null}
          <Icons.chevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  )
}

export function getPager(currentItem: MdxPagerItem, allItems: MdxPagerItem[]) {
  const flattenedLinks = allItems.flat()
  const activeIndex = flattenedLinks.findIndex(
    (link) => currentItem.slug === link?.slug
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
