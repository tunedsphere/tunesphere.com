import Image from "next/image"
import Link from "next/link"
import { db } from "@/db"
import { products, stores, type Product } from "@/db/schema"
import { FeaturedProductCard } from "@/components/cards/featured-product-card"
import { Shell } from "@/components/shells/shell"
import { desc, eq, sql } from "drizzle-orm"
 import { Icons } from "@/components/icons"
import { productCategories } from "@/configs/products"
import { slugify } from "@/lib/utils"

import heroShop3 from "@/public/bghome/heroShop3.png"

import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs } from "@/components/ui/tabs"

import { ProductCard } from "@/components/cards/product-card"
import { CategoryCard } from "@/components/cards/category-card"
import { ProudctTabs } from "@/components/pagers/product-tabs"
import { StoreCard } from "@/components/cards/store-card"
import { WhatIsTunedSphere } from "@/components/whatistunedsphere-card"
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription
} from "@/components/page-header"
import { StartYourJourney } from "@/components/start-your-journey"

interface ShopPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  }// Correct data type definition
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const category = searchParams?.category ?? "art";


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
           <Image
    src={heroShop3}
    width={4000}
    height={600}
    alt="planet Home"
    className="absolute object-cover max-w-8xl h-[600px] mx-auto left-0 right-0 -z-10 opacity-50"
  ></Image>
          <PageHeaderHeading size="lg" variant="shop" className="md:py-24 py-6 tracking-tighter">
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

        <section
          id="categories"
          aria-labelledby="categories-heading"
          className="w-full space-y-6 py-6 @container md:pt-10 z-10"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <PageHeader
              id="shop-categories-header"
              aria-labelledby="shop-categories-header-heading">
              <PageHeaderHeading size="lg" className="py-8 ">Categories</PageHeaderHeading>
              <PageHeaderDescription size="lg" className="">
                Explore our categories and find the best products for you
              </PageHeaderDescription>
            </PageHeader>
          </div>
          <div className="grid grid-cols-3 sm:gap-8 gap-1.5 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productCategories.map((category) => (
              <CategoryCard 
              key={category.title} 
              category={category} />
            ))}
          </div>
        </section>

        <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="space-y-6 overflow-hidden py-8 md:pt-12 lg:pt-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 overflow-visible text-center">
          <h2 className="  font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl underline-offset-4 underline decoration-primary">
          Featured products
          </h2>
        </div>
        <Tabs defaultValue="art" className="space-y-6 overflow-visible">
          <ScrollArea
            orientation="horizontal"
            className="pb-2"
            scrollBarClassName="h-1.5"
          >
            <ProudctTabs />
          </ScrollArea>

          <div className="flex flex-col space-y-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {someProducts.length > 0 ? (
                someProducts.map((product) => (
                  <ProductCard 
                  key={product.id} 
                  product={product} />
                ))
              ) : (
                <div className="flex h-full flex-col items-center justify-center space-y-1 pt-10">
                  <Icons.product
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
                  className: "mx-auto",
                })
              )}
            >
              View all {category}
              <span className="sr-only">View all Category</span>
            </Link>
          </div>
        </Tabs>
      </section>

        <section
          id="featured-products"
          aria-labelledby="featured-products-heading"
          className="space-y-6 px-0 overflow-hidden py-8 md:pt-12 lg:pt-24"
        >
          <div className="flex w-full items-center px-2">
            <PageHeaderHeading size="xs" className="flex-1 /90 underline-offset-4 underline decoration-primary font-semibold">
              Recently Added
            </PageHeaderHeading>
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 overflow-visible text-center">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl"></h2></div>
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
              <FeaturedProductCard 
              key={product.id}
              product={product} />
            ))}
          </div>
        </section>

        <section
          id="featured-stores"
          aria-labelledby="featured-stores-heading"
          className="flex flex-col space-y-6 py-8 md:pt-12 lg:pt-24"
          >
           <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <PageHeaderHeading size="lg" className="flex-1 /90 underline-offset-4 underline decoration-primary font-semibold">
              Featured Stores
            </PageHeaderHeading> 
          </div>
          <div className="flex flex-col space-y-10">
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
                size: "sm",
                className: "mx-auto",
              })
            )}
          >
                View all Stores           
                 <span className="sr-only">View all stores</span>
            </Link>
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
              href={`/shop/c/${String(productCategories[0]?.title)}/${subcategory.slug}`}
            >
              <Badge variant="secondary" className="rounded px-3 py-1">
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
