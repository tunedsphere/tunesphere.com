
import '@styles/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import planet2 from '@/public/bghome/planet2.png'
import NewReleasesSection from '@components/new-releases'
import React from 'react'
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { desc, eq, sql } from "drizzle-orm"
import { productCategories } from "@/configs/products"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { SiteGlobalNav } from '@components/layouts/site-global-nav'
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { Shell } from "@/components/shell"

export const dynamic = "force-dynamic"

export default async function MyApp() {
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
      <SiteGlobalNav />
      <div className='grid grid-cols-2'>
        <div className='w-1/2'>
          <Image
            src={planet2}
            placeholder="blur"
            width={500}
            height={500}
            alt="planet Home"
            className='-z-10 absolute left-0 top-0 md:w-1/3 w-2/5 block sm:hidden md:block'>
          </Image>
        </div>
      </div>

      <main className="mt-[var(--headerHeight)] sm:mt-[var(--globalNavHeight)]">
        <section className="section-max-width flex flex-col items-center justify-between md:px-8 mx-auto">
          <div className="py-12 md:mt-12 mt-2" >
            <h1 className="font-extrabold dark:text-white md:text-5xl lg:text-6xl text-center justify-center text-transparent bg-clip-text">
              <span className="text-texthigh">A </span>
              <span className="text-transparent bg-clip-text party1">Psychedelic </span>
              <span className="text-transparent bg-clip-text party2">Dedicated </span>
              <span className="text-transparent bg-clip-text party3">Platform</span>
            </h1>

            <p className="py-4 text-lg font-normal text-textlow lg:text-xl text-center">
              Explore the musical realm of Psychedelic Art, with Music, Art, Decorations, and Festivals
            </p>
          </div>

          <div className='left-gradient -z-10'> </div>
          <div className='right-gradient -z-10'> </div>

          <div className='grid xl:grid-cols-4 py-16 2xl:text-left text-center text-textlow'>
            <Link href="/labels" passHref>
              <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30" rel="noopener noreferrer">
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Labels{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-textlow`}>
                  Search & Find the label that suits your ears the most.
                </p>
              </div>
            </Link>

            <Link href="/artists" passHref>
              <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30" rel="noopener noreferrer">
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Artists & DJ{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-textlow`}>
                  Explore in depth of your favorite genre and find inspiring Artists
                </p>
              </div>
            </Link>

            <Link href="/festivals" passHref>
              <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30" rel="noopener noreferrer">
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Festivals{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-textlow`}>
                  Instantly check where your favorite Artist will play.
                </p>
              </div>
            </Link>

            <Link href="/labels" passHref>
              <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30  group-hover:translate-x-1 motion-reduce:transform-none" rel="noopener noreferrer">
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Most popular{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-textlow`}>
                  Visit the most Popular request
                </p>
              </div>
            </Link>

          </div>

          <div className='flex justify-center'>
            {/* <NewReleasesSection/>  */}
          </div>
        </section>
        <Shell className="gap-12 section-max-width">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="flex flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          A Store built for You and with everything you would expect.
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 py-8">
          <Link
            href="/products"
            className={cn(
              buttonVariants({
                size: "lg",
              })
            )}
          >
            Buy Now
          </Link>
          <Link
            href="/dashboard/stores"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              })
            )}
          >
            Sell Now
          </Link>
        </div>
      </section>
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-6 py-6 md:pt-10 lg:pt-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
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
              href={`/categories/${category.title}`}
            >
              <div className="group relative overflow-hidden rounded-md">
            
                  <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
                  <Image
                    src={category.image}
                    alt={category.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    priority
                  />
              
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
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
        className="section-max-width grid place-items-center gap-6 rounded-lg border bg-card px-6 py-16 text-center text-card-foreground shadow-sm"
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
        className="section-max-width space-y-6"
      >
        <div className="flex items-center">
          <h2 className="flex-1 text-2xl font-medium sm:text-3xl">
            Featured products
          </h2>
          <Link href="/products">
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section
        id="featured-stores"
        aria-labelledby="featured-stores-heading"
        className="section-max-width space-y-6"
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
                <Link href={`/products?store_ids=${store.id}`}>
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
        className="section-max-width flex flex-wrap items-center justify-center gap-4 pb-4"
      >
        {productCategories[
          Math.floor(Math.random() * productCategories.length)
        ]?.subcategories.map((subcategory) => (
          <Link
            key={subcategory.slug}
            href={`/categories/${String(productCategories[0]?.title)}/${
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
    </main>
    </> 
  )
}