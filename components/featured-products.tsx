import Link from 'next/link'
import { db } from '@/db'
import { products, stores, type Product } from '@/db/schema'

import { desc, eq } from 'drizzle-orm'
import { Icon } from '@/components/icon'
import { productCategories } from '@/configs/products'

import { cn } from '@/lib/utils'

import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs } from '@/components/ui/tabs'

import { ProductCard } from '@/components/cards/product-card'

import { ProudctTabs } from '@/components/pagers/product-tabs'

import { delayFeaturedProducts } from '@/lib/delays'
import { AspectRatio } from './ui/aspect-ratio'
import { PageHeader, PageHeaderHeading } from './page-header'
interface FeaturedProductsProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  } // Correct data type definition
}

export async function FeaturedProducts({
  searchParams,
}: FeaturedProductsProps) {
  await new Promise((resolve) => setTimeout(resolve, delayFeaturedProducts))
  const category = searchParams?.category ?? 'art'
  const randomProductCategory =
    productCategories[Math.floor(Math.random() * productCategories.length)]

  const someProducts = await db.query.products.findMany({
    with: {
      store: true,
    },
    where:
      typeof category === 'string'
        ? eq(products.category, category as Product['category'])
        : undefined,
    limit: 4, // Limit the total number of results to 4
  })

  const storeNames = someProducts.map((product) => product.store.name)
  console.log(storeNames)
  return (
    <section
      id="featured-products"
      aria-labelledby="featured-products-heading"
      className="space-y-6 overflow-hidden px-2 py-8 md:pt-12 lg:pt-24"
    >
      <PageHeader className="font-heading mx-auto flex max-w-[58rem] flex-col items-center space-y-4 overflow-visible py-8 text-center text-3xl font-bold leading-[1.1] underline decoration-primary underline-offset-4 sm:text-3xl md:text-5xl">
        <PageHeaderHeading as="h2" size="lg" className="py-8 ">
          Featured products
        </PageHeaderHeading>
      </PageHeader>
      <Tabs defaultValue="art" className="space-y-6 overflow-visible">
        <ScrollArea
          orientation="horizontal"
          className="pb-2"
          scrollBarClassName="h-1.5"
        >
          <ProudctTabs />
        </ScrollArea>

        <div className="flex flex-col space-y-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {someProducts.length > 0 ? (
              someProducts.map((product) => (
                <ProductCard
                  storeName={product.store.name}
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <div className="flex h-full flex-col items-center justify-center space-y-1 pt-10">
                <Icon
                  name="product"
                  className="mb-4 h-16 w-16 text-muted-foreground"
                  aria-hidden="true"
                />
                <div className="text-xl font-medium text-muted-foreground">
                  No products found
                </div>
                <div className="text-sm text-muted-foreground">
                  Please try again later
                </div>
              </div>
            )}
          </div>
          <Link
            href={`/shop/c/${category}`}
            className={cn(
              buttonVariants({
                className: 'mx-auto',
                variant: 'default',
              }),
            )}
          >
            View all {category}
            <span className="sr-only">View all Category</span>
          </Link>
        </div>
      </Tabs>
    </section>
  )
}

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-theme/10 before:to-transparent`

function ProductSkeleton() {
  return (
    <div className="col-span-4 flex flex-col lg:col-span-1">
      <div className={`rounded-t-lg bg-card ${shimmer}`}>
        <AspectRatio ratio={4 / 3}>
          <div className={`bg-card ${shimmer}`} />
        </AspectRatio>
      </div>
      <div className="flex-col space-y-2 rounded-b-lg  bg-card p-6">
        <div className={`h-4 w-1/4 rounded-lg bg-muted ${shimmer}`} />
        <div className={`h-4 w-full rounded-lg bg-muted ${shimmer}`} />
        <div className={`mx-auto h-6 w-1/2 rounded-lg bg-muted ${shimmer}`} />
      </div>
    </div>
  )
}

export function FeaturedProductsSkeleton() {
  return (
    <section
      id="featured-products"
      aria-labelledby="featured-products-heading"
      className="space-y-6 overflow-hidden py-8 md:pt-12 lg:pt-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 overflow-visible text-center">
        <h2 className="  font-heading text-3xl font-bold leading-[1.1] underline decoration-primary underline-offset-4 sm:text-3xl md:text-5xl">
          Featured products
        </h2>
      </div>
      <div className="space-y-6 pb-[5px]">
        <div className="mx-auto flex h-12 items-center justify-center space-y-2">
          <div className={`h-6 w-1/3 rounded-lg bg-card ${shimmer}`} />
        </div>

        <div className="grid grid-cols-4 gap-6">
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
      </div>
    </section>
  )
}
