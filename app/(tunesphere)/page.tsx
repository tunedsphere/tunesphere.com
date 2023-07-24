
import '@styles/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import planet2 from '@/public/bghome/planet2.png'

import React from 'react'

import { productCategories } from "@/configs/products"
import { cn } from "@/lib/utils"

import { SiteGlobalNav } from '@components/layouts/site-global-nav'
import { buttonVariants } from "@/components/ui/button"

import { Shell } from "@/components/shell"

export const dynamic = "force-dynamic"

export default async function MyApp() {

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
            <h1 className="font-extrabold dark:text-white text-center justify-center text-transparent bg-clip-text leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.4]">
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
            <Link href="/music" passHref>
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

            <Link href="/music" passHref>
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

            <Link href="/music" passHref>
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

            <Link href="/music" passHref>
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
            href="/shop/products"
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
          <h2 className="leading-normal font-normal text-textlow text-sm sm:leading-7">
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
    </Shell>
    </main>
    </> 
  )
}