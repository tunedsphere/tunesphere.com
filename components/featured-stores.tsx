import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/db'
import { products, stores, type Product } from '@/db/schema'
import { desc, eq, sql } from 'drizzle-orm'
import { slugify } from '@/lib/utils'

import { cn } from '@/lib/utils'

import { buttonVariants } from '@/components/ui/button'
import { StoreCard } from '@/components/cards/store-card'
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from '@/components/page-header'
import { delayFeaturedStores } from '@/lib/delays'

interface FeaturedStoresProps {}

export async function FeaturedStores({}: FeaturedStoresProps) {
  await new Promise((resolve) => setTimeout(resolve, delayFeaturedStores))

  const someStores = await db
    .select({
      id: stores.id,
      name: stores.name,
      storeBanner: stores.storeBanner,
      description: stores.description,
      stripeAccountId: stores.stripeAccountId,
    })
    .from(stores)
    .limit(4)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`))

  return (
    <section
      id="featured-stores"
      aria-labelledby="featured-stores-heading"
      className="flex flex-col space-y-6 py-8 md:pt-12 lg:pt-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <PageHeaderHeading
          size="lg"
          className="flex-1 py-8 font-semibold underline decoration-primary underline-offset-4"
        >
          Featured Stores
        </PageHeaderHeading>
      </div>
      <div className="flex flex-col space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {someStores.map((store) => (
            <StoreCard
              href={`/shop/store/${store.id}/${slugify(store.name)}`}
              key={store.id}
              store={store}
            />
          ))}
        </div>
        <Link
          href="/shop/stores"
          className={cn(
            buttonVariants({
              size: 'sm',
              className: 'mx-auto',
            }),
          )}
        >
          View all Stores
          <span className="sr-only">View all stores</span>
        </Link>
      </div>
    </section>
  )
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-theme/10 before:to-transparent`

function StoreSkeleton() {
  return (
    <div className="col-span-4 flex flex-col lg:col-span-1">
      <div className={`h-[157px] bg-card ${shimmer}`} />
      <div className="h-[101px] flex-col space-y-1.5 bg-card p-6">
        <div className={`h-6 w-1/3 rounded-lg bg-muted ${shimmer}`} />
        <div className={`h-4 w-full rounded-lg bg-muted ${shimmer}`} />
      </div>
    </div>
  )
}

export function FeaturedStoresSkeleton() {
  return (
    <section
      id="featured-stores"
      aria-labelledby="featured-stores-heading"
      className="space-y-6 overflow-hidden py-8 md:pt-12 lg:pt-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 overflow-visible text-center">
        <h2 className="  font-heading text-3xl font-bold leading-[1.1] underline decoration-primary underline-offset-4 sm:text-3xl md:text-5xl">
          Featured Stores
        </h2>
      </div>
      <div className="space-y-6 pb-[5px]">
        <div className="grid grid-cols-4 gap-6">
          <StoreSkeleton />
          <StoreSkeleton />
          <StoreSkeleton />
          <StoreSkeleton />
        </div>
      </div>
      <div className="mx-auto flex">
        <Link
          href="/shop/stores"
          className={cn(
            buttonVariants({
              size: 'sm',
              className: 'mx-auto',
            }),
          )}
        >
          View all Stores
          <span className="sr-only">View all stores</span>
        </Link>
      </div>
    </section>
  )
}
