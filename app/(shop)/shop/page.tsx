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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

  const allStoresWithProductCount = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      productCount: sql<number>`count(${products.id})`,
    })
    .from(stores)
    .limit(4)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(sql<number>`count(${products.id})`))

  return (
    <>
      <Shell className="container mx-auto px-0 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-28">
        <section
          id="shop"
          aria-labelledby="shop-heading"
          className="px-2 text-center"
        >
          <h1 className="z-10 justify-center text-4xl font-bold leading-tight tracking-tighter text-textdark md:text-5xl lg:text-6xl lg:leading-[1.1]">
            A Store specially built for You with everything you would expect
          </h1>
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
                    "hero_gradient-button hover:bg-popover"
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
                    "hero_gradient-button-shop z-30 hover:bg-popover"
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
            <h2 className="text-3xl font-bold leading-[1.1] text-textdark sm:text-3xl md:text-5xl">
              Categories
            </h2>
            <h2 className="max-w-[46rem] text-lg leading-normal text-muted-foreground sm:leading-7">
              Explore our categories and find the best products for you
            </h2>
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
          className="place-items-center gap-6 bg-card px-6 py-16 text-center text-card-foreground shadow-sm sm:rounded-lg"
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
            <h2 className="flex-1 text-2xl font-medium sm:text-3xl">
              Featured products
            </h2>
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
          className="space-y-6 px-0"
        >
          <h2 className="text-2xl font-medium sm:text-3xl">Featured stores</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allStoresWithProductCount.map((store) => (
              <Card key={store.id} className="flex h-full flex-col">
                <CardHeader className="flex-1">
                  <CardTitle className="line-clamp-1">{store.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {store.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/shop/products?store_ids=${store.id}`}>
                    <div
                      className={cn(
                        buttonVariants({
                          size: "sm",
                          className: "h-8 w-full",
                        })
                      )}
                    >
                      View products ({store.productCount})
                      <span className="sr-only">{`${store.name} store products`}</span>
                    </div>
                  </Link>
                </CardContent>
              </Card>
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
    </>
  )
}
