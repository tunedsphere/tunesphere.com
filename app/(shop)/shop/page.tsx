import Image from "next/image"
import Link from "next/link"
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { FeaturedProductCard } from "@/components/products/featured-product-card"
import { Shell } from "@/components/shells/shell"
import { desc, eq, sql } from "drizzle-orm"

import { productCategories } from "@/configs/products"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"

import { StoreCard } from "@/components/cards/store-card"
import { WhatIsTunedSphere } from "@/components/whatistunedsphere-card"
import { 
  PageHeader,
  PageHeaderHeading, 
  PageHeaderDescription 
} from "@/components/page-header"
// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

// This is equivalent to getServersideProps() in the pages directory
// Read more: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = "force-dynamic"

export default async function ShopPage() {
  const allProducts = await db
    .select()
    .from(products)
    .limit(10)
    .orderBy(desc(products.createdAt))

    const someStores = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      stripeAccountId: stores.stripeAccountId,
    })
    .from(stores)
    .limit(4)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`))

  return (
    <>
      <Shell variant="shop"> 
        <section
          id="shop-heading"
          aria-labelledby="shop-heading"
          className="px-2 text-center"
        >
          <PageHeaderHeading size="lg" className="md:py-24 py-6 text-textdark tracking-tighter">
            A Store specially built for You with everything you would expect
          </PageHeaderHeading>
          <div className="relative mx-auto w-full max-w-[400px] py-8">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="button_bg-gradient-theme absolute inset-x-0"></div>
              <div className="hero_gradient-button-wrapper z-20 flex-1 items-stretch">
                <Link
                  href="/shop/products"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                    }),
                    "hero_gradient-button hover:bg-theme-300"
                  )}
                >
                  <span className="animated-gradient-text_background-theme animated-gradient-text_background-theme bg-clip-text font-semibold">
                    <span className="animated-gradient-text_foreground-theme animated-gradient-text_foreground-theme bg-clip-text font-semibold">
                      Explore Products
                    </span>
                  </span>
                </Link>
              </div>

              <div className="hero_gradient-button-wrapper z-20 flex-1 items-stretch">
                <div className="hero_gradient-button-bg hero_bg-theme blur"></div>

                <Link
                  href="/dashboard/stores"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                    }),
                    "hero_gradient-button-shop z-30 hover:text-theme-300 hover:bg-transparent"
                  )}
                >
                  <span className="font-semibold text-textdark">Sell Now</span>
                </Link>
              </div>

              <div className="button_bg-gradient-theme absolute inset-x-0 -z-10"></div>
            </div>
          </div>
        </section>
        <section
          id="categories"
          aria-labelledby="categories-heading"
          className="w-full space-y-6 py-6 @container md:pt-10"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <PageHeader
        
        id="shop-categories-header"
        aria-labelledby="shop-categories-header-heading"
      >
        <PageHeaderHeading size="lg" className="py-8 text-textdark">Categories</PageHeaderHeading>
        <PageHeaderDescription size="lg">
        Explore our categories and find the best products for you
        </PageHeaderDescription>
      </PageHeader>
          </div>
          <div className="grid grid-cols-1 gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
            {productCategories.map((category) => (
              <Link
                aria-label={`Go to ${category.title}`}
                key={category.title}
                href={`/shop/categories/${category.title}`}
              >
                <div className="group relative overflow-hidden rounded-md">
                  <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={500}
                    height={500}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw h-[700px]"
                    className="object-cover transition-transform group-hover:scale-105"
                    priority
                  />

                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <h3 className="text-3xl font-medium capitalize text-textlow md:text-2xl">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <Shell
          id="create-a-store-banner"
          aria-labelledby="create-a-store-banner-heading"
          className="place-items-center gap-6 bg-accent-1 px-6 py-16 text-center text-card-foreground shadow-sm sm:rounded-lg"
        >
          <h2 className="text-2xl font-medium sm:text-3xl">
            Do you want to sell your products on our website?
          </h2>
          <Link href="/dashboard/stores">
            <div className={cn(buttonVariants())}>
              Create a store
              <span className="sr-only">Create a store</span>
            </div>
          </Link>
        </Shell>
        <section
          id="featured-products"
          aria-labelledby="featured-products-heading"
          className="space-y-6 px-0"
        >
          <div className="flex w-full items-center px-2">
          <PageHeaderHeading size="sm" className="flex-1 text-textdark">
              Featured products
            </PageHeaderHeading>
            <Link href="/shop/products">
              <div
                className={cn(
                  buttonVariants({
                    size: "sm",
                  })
                )}
              >
                View all
                <span className="sr-only">View all products</span>
              </div>
            </Link>
          </div>
          <div className="grid w-full grid-cols-2 gap-0 px-0 sm:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {allProducts.map((product) => (
              <FeaturedProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        <section
        id="featured-stores"
        aria-labelledby="featured-stores-heading"
        className="space-y-6"
      >
        <div className="flex items-center px-2">
         <PageHeaderHeading size="sm" className="flex-1 text-textdark">
            Featured stores
         </PageHeaderHeading>
          <Link aria-label="Stores" href="/stores">
            <div
              className={cn(
                buttonVariants({
                  size: "sm",
                })
              )}
            >
              View all
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {someStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              href={`/products?store_ids=${store.id}`}
            />
          ))}
        </div>
      </section>
        <section
          id="random-subcategories"
          aria-labelledby="random-subcategories-heading"
          className="flex w-full flex-wrap items-center justify-center gap-4 pb-4"
        >
          {productCategories[
            Math.floor(Math.random() * productCategories.length)
          ]?.subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/shop/categories/${String(productCategories[0]?.title)}/${
                subcategory.slug
              }`}
            >
              <Badge variant="secondary" className="rounded px-3 py-1">
                {subcategory.title}
              </Badge>
              <span className="sr-only">{subcategory.title}</span>
            </Link>
          ))}
        </section>
      </Shell>
        <WhatIsTunedSphere />
    </>
  )
}
