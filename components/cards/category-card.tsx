import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/db'
import { products } from '@/db/schema'
import { cn } from '@/lib/utils'
import type { Category } from '@/types'
import { eq, sql } from 'drizzle-orm'
import { formatTitleWithUnderscores } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { buttonVariants } from '../ui/button'
import { Icon, IconName } from '../icon'

interface CategoryCardProps {
  category: Category
  icon?: IconName
}

export async function CategoryCard({ category, icon }: CategoryCardProps) {
  const productCount = await db
    .select({
      count: sql<number>`count(*)`.mapWith(Number),
    })
    .from(products)
    .where(eq(products.category, category.title))
    .execute()
    .then((res) => res[0]?.count ?? 0)

  return (
    <>
      <div className="flex flex-col">
        <Link
          key={`${category.title}_link`}
          href={`shop/c/${category.title}`}
          className="group relative cursor-pointer overflow-hidden rounded-full border sm:rounded-md "
        >
          <div className="aspect-square sm:aspect-video">
            <div className="transition-color absolute inset-0 z-10 bg-muted/20 group-hover:bg-zinc-950/50 " />
            <Image
              key={`${category.title}_key`}
              src={category.image}
              alt={`${category.title} category`}
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              priority
            />
          </div>
          <div className="absolute inset-2 z-20 flex flex-col sm:inset-4">
            <div className="top-0 flex items-center justify-between space-x-2 sm:items-start sm:space-x-4">
              <div
                className={cn(
                  buttonVariants({
                    className:
                      'pointer-events-none hidden rounded-lg border-none bg-muted p-2.5 text-muted-foreground sm:block',
                  }),
                )}
                aria-hidden="true"
              >
                {icon && <Icon name={icon} className="h-4 w-4" />}
              </div>
              <div>
                <p className="ml-2 hidden rounded-md bg-black/10 px-2 text-sm text-zinc-200 backdrop-blur-sm sm:block">
                  {productCount} items
                </p>
              </div>
            </div>
            <div className="mt-auto hidden sm:flex ">
              <span className="mr-2 grow-0 rounded-md bg-black/10 px-2 text-center text-xl font-medium capitalize text-zinc-200 backdrop-blur-sm sm:text-left">
                {formatTitleWithUnderscores(category.title)}
              </span>
            </div>
          </div>
          <span className="sr-only">{category.title}</span>
        </Link>
        <div className="">
          <Link
            key={category.title}
            href={`shop/c/${category.title}`}
            className="group relative overflow-hidden rounded-full sm:rounded-md"
          >
            <h4 className="z-400 block text-center text-base font-medium capitalize sm:hidden">
              {formatTitleWithUnderscores(category.title)}
            </h4>
          </Link>
        </div>
      </div>
    </>
  )
}
