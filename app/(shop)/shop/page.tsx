import Image from "next/image"
import Link from "next/link"
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { FeaturedProductCard } from "@/components/cards/featured-product-card"
import { Shell } from "@/components/shells/shell"
import { desc, eq, sql } from "drizzle-orm"

import { productCategories } from "@/configs/products"

import heroShop3 from "@/public/bghome/heroShop3.png"

import { cn } from "@/lib/utils"
import { CategoryCard } from "@/components/cards/category-card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { StoreCard } from "@/components/cards/store-card"
import { WhatIsTunedSphere } from "@/components/whatistunedsphere-card"
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription
} from "@/components/page-header"


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

      <Shell variant="shop"
        className="bg-transparent">
        <section
          id="shop-heading"
          aria-labelledby="shop-heading"
          className="px-2 pt-8 text-center z-10"
        >
           <Image
    src={heroShop3}
    width={4000}
    height={600}
    alt="planet Home"
    className="absolute object-cover max-w-8xl h-[600px] mx-auto left-0 right-0 -z-10 opacity-50"
  ></Image>
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
          className="w-full space-y-6 py-6 @container md:pt-10 z-10"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <PageHeader
              id="shop-categories-header"
              aria-labelledby="shop-categories-header-heading">
              <PageHeaderHeading size="lg" className="py-8 text-textdark">Categories</PageHeaderHeading>
              <PageHeaderDescription size="lg">
                Explore our categories and find the best products for you
              </PageHeaderDescription>
            </PageHeader>
          </div>
          <div className="grid grid-cols-3 sm:gap-8 gap-1.5 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productCategories.map((category) => (
              <CategoryCard key={category.title} category={category} />
            ))}
          </div>
        </section>
        <section
          id="featured-products"
          aria-labelledby="featured-products-heading"
          className="space-y-6 px-0"
        >
          <div className="flex w-full items-center px-2">
            <PageHeaderHeading size="xs" className="flex-1 text-textdark/90 underline-offset-4 underline decoration-primary font-semibold">
              Recently Added
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
          <div className="grid w-full grid-cols-2 gap-1.5 px-0 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
            <PageHeaderHeading size="xs" className="flex-1 text-textdark/90 underline-offset-4 underline decoration-primary font-semibold">
              Featured Stores
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
              href={`/shop/categories/${String(productCategories[0]?.title)}/${subcategory.slug
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
      <section
        id="create-a-store-banner"
        aria-labelledby="create-a-store-banner-heading"
        className="place-items-center gap-6 bg-muted px-6 py-16 text-center text-card-foreground"
      >
        <div className="flex-1 flex mx-auto justify-center max-w-7xl">
          <div className="w-1/2">
            <h2 className="text-2xl font-medium sm:text-3xl">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg mt-4">
              Create Your Psychedelics Store Today and Explore New Horizons!
            </p>
          </div>

          <div className="w-1/2">
            <Link href="/dashboard/stores">
              <div className={cn(buttonVariants())}>
                Create a store
                <span className="sr-only">Create a store</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="@container gap-6 pt-8 flex mx-auto max-w-7xl align-middle text-center justify-center">
          <div className="">
            <p className="text-xl">
              <span className="text-2xl font-semibold">Step 1:</span> Sign Up for an Account
            </p>
          </div>
          <div>
            <p className="text-xl">
              <span className="text-2xl font-semibold">Step 2:</span> Set Up Your Store
            </p>
          </div>
          <div>
            <p className="text-xl">
              <span className="text-2xl font-semibold">Step 3:</span> Start Selling Your Products
            </p>
          </div>
        </div>

      </section>
      <WhatIsTunedSphere />
    </>
  )
}
