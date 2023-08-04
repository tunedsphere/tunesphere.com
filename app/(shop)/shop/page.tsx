import Image from "next/image"
import Link from "next/link"
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { desc, eq, sql } from "drizzle-orm"

import { productCategories } from "@/configs/products"
import { siteConfig } from "@/configs/site"
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
import { Icons } from "@/components/icons"
import { FeaturedProductCard } from "@components/products/featured-product-card"
import { Shell } from "@components/shells/shell"

// Running out of edge function execution units on vercel free plan
// export const runtime = "edge"

// This is equivalent to getServersideProps() in the pages directory
// Read more: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = "force-dynamic"

export default async function ShopPage() {
  const allProducts = await db
    .select()
    .from(products)
    .limit(8)
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
    <Shell className="px-0 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-28 mx-auto container">
      <section
        id="shop"
        aria-labelledby="shop-heading"
        className="px-2 text-center"
      >
        <h1 className="justify-center z-10 text-3xl text-textdark font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          A Store specially built for You with everything you would expect
        </h1>
        <div className="relative w-full max-w-[400px] mx-auto py-8">
        <div className="flex flex-wrap items-center justify-center gap-4">  
        <div className="absolute button_bg-gradient-colortheme left-0 right-0"></div>
             <div className='hero_gradient-button-wrapper flex-1 flex-start items-stretch z-20'>
          <Link
            href="/shop/products"
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "hero_gradient-button hover:bg-popover"
            )}  
          >
          <span 
              className="animated-gradient-text_background-colortheme animated-gradient-text_background-colortheme bg-clip-text font-semibold"
              >
               <span 
              className="animated-gradient-text_foreground-colortheme animated-gradient-text_foreground-colortheme bg-clip-text font-semibold">Explore Products</span></span>
          
          </Link>
          </div>
          
          <div className='hero_gradient-button-wrapper z-20 flex-1 flex-start items-stretch'>
          <div className='hero_gradient-button-bg blur hero_bg-colortheme'></div>

          <Link
            href="/dashboard/stores"
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "hero_gradient-button-shop z-30 hover:bg-popover"
            )}
          ><span className='text-textdark font-semibold'>Sell Now</span>
            
          </Link>
          </div>

          <div className="absolute button_bg-gradient-colortheme left-0 right-0 -z-10"></div>

          </div>

        </div>
      </section>
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-6 py-6 md:pt-10 w-full"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl text-textdark font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Categories
          </h2>
          <h2 className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Explore our categories and find the best products for you
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      <section
        id="create-a-store-banner"
        aria-labelledby="create-a-store-banner-heading"
        className="section-max-width w-full grid place-items-center gap-6 sm:rounded-lg bg-card px-6 py-16 text-center text-card-foreground shadow-sm"
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
      </section>
      <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="px-0 space-y-6"
      >
        <div className="w-full px-2 flex items-center">
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
        <div className="px-0 w-full grid grid-cols-2 gap-0 sm:gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {allProducts.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section
        id="featured-stores"
        aria-labelledby="featured-stores-heading"
        className="px-0 space-y-6"
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
        className="w-full flex flex-wrap items-center justify-center gap-4 pb-4"
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
