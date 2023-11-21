import Image from "next/image"
import Link from "next/link"
import { db } from "@/db"
import { products, stores, type Product } from "@/db/schema"
import { Shell } from "@/components/shells/shell"
import { desc, eq, sql } from "drizzle-orm"
import { productCategories } from "@/configs/products"

import heroShop3 from "@/public/bghome/heroShop3.png"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { WhatIsTunedSphere } from "@/components/whatistunedsphere-card"
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription
} from "@/components/page-header"
import { StartYourJourney } from "@/components/start-your-journey"
import { RecentlyAddedProducts, RecentlyAddedProductsSkeleton } from "@/components/recently-added-products"
import { FeaturedProducts, FeaturedProductsSkeleton } from "@/components/featured-products"
import { FeaturedStores, FeaturedStoresSkeleton } from "@/components/featured-stores"
import { FeaturedCategories, FeaturedCategoriesSkeleton } from "@/components/featured-categories"
import { Suspense } from "react"

interface ShopPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  }// Correct data type definition
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const category = searchParams?.category ?? "art";
  const randomProductCategory =
    productCategories[Math.floor(Math.random() * productCategories.length)]

  const allProducts = await db
    .select()
    .from(products)
    .limit(8)
    .groupBy(products.id)
    .orderBy(desc(products.createdAt))

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

      const someProducts = await db
      .select({
        id: products.id,
        name: products.name,
        images: products.images,
        category: products.category,
        price: products.price,
        inventory: products.inventory,
        stripeAccountId: stores.stripeAccountId,
      })
      .from(products)
      .limit(4)
      .leftJoin(stores, eq(products.storeId, stores.id))
      .where(
        typeof category === "string"
          ? eq(products.category, category as Product["category"])
          : undefined
      )
      .groupBy(products.id)
      .orderBy(desc(stores.stripeAccountId), desc(products.createdAt))

  return (
    <>
      <Shell variant="shop"
        className="bg-transparent">
        <section
          id="shop-heading"
          aria-labelledby="shop-heading"
          className="px-2 pt-8 text-center z-10"
        >
          <div
        id="shop-header-image"
         className="mx-auto shrink-0 flex justify-center min-w-full"> 
           <Image
    src={heroShop3}
    width={4000}
    height={600}
    alt="planet Home"
    className="absolute object-cover w-full h-full aspect-video max-h-[500px] -z-10 opacity-50"
  ></Image>
  </div>
  <PageHeader>
          <PageHeaderHeading size="lg" variant="shop" className="md:py-24 py-6 tracking-tighter">
            A Store specially built for You with everything you would expect
          </PageHeaderHeading>
          </PageHeader>
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
                    "hero_gradient-button hover:bg-background hover:text-sm text-primary"
                  )}
                >
                  <span className="animated-gradient-text_background-theme bg-clip-text font-semibold">
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
                    "hero_gradient-button-shop hover:bg-background z-30"
                  )}
                >
                  <span className="font-semibold">Sell Now</span>
                </Link>
              </div>

              <div className="button_bg-gradient-theme absolute inset-x-0 -z-10"></div>
            </div>
          </div>
        </section>

        <Suspense fallback={<FeaturedCategoriesSkeleton />}>
              <FeaturedCategories/>
        </Suspense>

        <Suspense fallback={<FeaturedProductsSkeleton />}>
              <FeaturedProducts searchParams={searchParams}/>
        </Suspense>

        <Suspense fallback={<RecentlyAddedProductsSkeleton />}>
            <RecentlyAddedProducts/>         
        </Suspense>

         <Suspense fallback={<FeaturedStoresSkeleton />}>
          <FeaturedStores/>
        </Suspense>

        <section
          id="random-subcategories"
          aria-labelledby="random-subcategories-heading"
          className="flex w-full flex-wrap items-center justify-center gap-4 pb-4"
        >
          {randomProductCategory?.subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/shop/c/${randomProductCategory?.title}/${String(
                subcategory.slug
                )}`}
            >
              <Badge className="rounded px-3 py-1">
                {subcategory.title}
              </Badge>
              <span className="sr-only">{subcategory.title}</span>
            </Link>
          ))}
        </section>
      </Shell>
       <StartYourJourney/>
       <WhatIsTunedSphere />
    </>
  )
}

