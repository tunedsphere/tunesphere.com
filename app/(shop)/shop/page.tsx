import Image from 'next/image'
import Link from 'next/link'
import '@/styles/animation.css'
import { Shell } from '@/components/shells/shell'
import { productCategories } from '@/configs/products'

import heroShop3 from '@/public/bghome/heroShop3.png'

import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { WhatIsTunedSphere } from '@/components/whatistunedsphere-card'
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from '@/components/page-header'
import { StartYourJourney } from '@/components/start-your-journey'
import {
  RecentlyAddedProducts,
  RecentlyAddedProductsSkeleton,
} from '@/components/recently-added-products'
import {
  FeaturedProducts,
  FeaturedProductsSkeleton,
} from '@/components/featured-products'
import {
  FeaturedStores,
  FeaturedStoresSkeleton,
} from '@/components/featured-stores'
import {
  FeaturedCategories,
  FeaturedCategoriesSkeleton,
} from '@/components/featured-categories'
import { Suspense } from 'react'

interface ShopPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  } // Correct data type definition
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const category = searchParams?.category ?? 'art'
  const randomProductCategory =
    productCategories[Math.floor(Math.random() * productCategories.length)]

  return (
    <>
      <Shell variant="shop" className="bg-transparent">
        <section
          id="shop-heading"
          aria-labelledby="shop-heading"
          className="z-10 px-2 pt-8 text-center"
        >
          <div
            id="shop-header-image"
            className="mx-auto flex min-w-full shrink-0 justify-center"
          >
            <Image
              src={heroShop3}
              width={4000}
              height={600}
              alt="planet Home"
              className="absolute -z-10 aspect-video h-full max-h-[600px] w-full object-cover opacity-50"
            ></Image>
          </div>
          <PageHeader>
            <PageHeaderHeading
              size="lg"
              variant="shop"
              className="py-6 tracking-tighter md:py-24"
            >
              A Store specially built for You with everything you would expect
            </PageHeaderHeading>
          </PageHeader>
          <div className="relative z-200 mx-auto max-w-[32rem] py-8">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="animated-bg-gradient-theme absolute inset-x-0"></div>
              <div className="grt-button-wrapper z-20 flex-1">
                <Link
                  href="/shop/products"
                  className={cn(
                    buttonVariants({
                      size: 'xl',
                    }),
                    'grt-button text-primary hover:bg-background hover:text-sm',
                  )}
                >
                  <span className="animated-grt-text_background-theme font-bold tracking-widest before:bg-foreground">
                    <span className="animated-grt-text_foreground-theme font-bold tracking-widest">
                      Explore Products
                    </span>
                  </span>
                </Link>
              </div>

              <div className="grt-button-wrapper z-20 flex-1">
                <div className="grt-btn-bg animated-grt-theme blur"></div>
                <span className="grt-btn-bg grt-theme"></span>

                <Link
                  href="/dashboard/stores"
                  className={cn(
                    buttonVariants({
                      size: 'xl',
                    }),
                    'grt-button z-30 hover:bg-transparent hover:text-theme-50',
                  )}
                >
                  <span className="font-bold tracking-widest">Sell Now</span>
                </Link>
              </div>

              <div className="animated-bg-gradient-theme absolute inset-x-0 -z-10"></div>
            </div>
          </div>
        </section>

        <Suspense fallback={<FeaturedCategoriesSkeleton />}>
          <FeaturedCategories />
        </Suspense>

        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts searchParams={searchParams} />
        </Suspense>

        <Suspense fallback={<RecentlyAddedProductsSkeleton />}>
          <RecentlyAddedProducts />
        </Suspense>

        <Suspense fallback={<FeaturedStoresSkeleton />}>
          <FeaturedStores />
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
                subcategory.slug,
              )}`}
            >
              <Badge className="rounded px-3 py-1">{subcategory.title}</Badge>
              <span className="sr-only">{subcategory.title}</span>
            </Link>
          ))}
        </section>
      </Shell>
      <StartYourJourney />
      <WhatIsTunedSphere />
    </>
  )
}
