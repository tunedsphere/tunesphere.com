import "@/styles/globals.css"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import planet2 from "@/public/bghome/planet2.png"
import { Icons } from "@/components/icons"
import { SiteGlobalNav } from "@/components/layouts/site-global-nav"
import { Shell } from "@/components/shells/shell"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"

import { productCategories } from "@/configs/products"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default function MyApp() {
  return (
    <>
      <SiteGlobalNav />
      <div className="grid grid-cols-2">
        <div className="w-1/2">
          <Image
            src={planet2}
            placeholder="blur"
            width={500}
            height={500}
            alt="planet Home"
            className="absolute left-0 top-0 -z-10 md:w-2/5"
          ></Image>
        </div>
      </div>

      <Shell className="mx-auto mt-[var(--headerHeight)] flex flex-col items-center justify-between sm:mt-[var(--globalNavHeight)] md:px-8">
        <div className="mt-12 py-12 md:mt-12">
          <div>
            <h1
              className="hero_title justify-center gap-2 text-center leading-tight tracking-tighter md:text-5xl md:leading-[1.4] lg:text-7xl lg:leading-[1.4]"
              aria-label="A Psychedelic Dedicated Platform"
            >
              <span className="text-texthigh">A </span>
              <span className="animated-gradient-text_background animated-gradient-text_background-1 bg-clip-text">
                <span className="animated-gradient-text_foreground animated-gradient-text_foreground-1 bg-clip-text">
                  Psychedelic
                </span>
              </span>
              <span className="animated-gradient-text_background animated-gradient-text_background-2 bg-clip-text">
                <span className="animated-gradient-text_foreground animated-gradient-text_foreground-2 bg-clip-text">
                  Dedicated
                </span>
              </span>
              <span className="animated-gradient-text_background animated-gradient-text_background-3 bg-clip-text">
                <span className="animated-gradient-text_foreground animated-gradient-text_foreground-3 bg-clip-text">
                  Platform
                </span>
              </span>
            </h1>
          </div>

          <p className="hero_description py-4 text-center text-lg font-normal text-textlow lg:text-xl">
            Explore the musical realm of Psychedelic Art, with Music, Art,
            Decorations, and Festivals
          </p>
        </div>

        {/* <div className='left-gradient -z-10'> </div> */}
        <div className="right-gradient -z-10"> </div>

        <div className="grid py-16 text-center text-textlow lg:grid-cols-4 2xl:text-left">
          <div className="hero_gradient-link-wrapper flex-1 items-stretch">
            <span className="hero_link-bg hero_bg-1 -inset-1"></span>

            <Link href="/music" passHref>
              <div
                className="group rounded-lg border border-transparent bg-background px-5 py-4 transition-colors hover:border-neutral-700"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Labels{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p
                  className={`m-0 max-w-[30ch] text-sm text-textlow opacity-50`}
                >
                  Search & Find the label that suits your ears the most.
                </p>
              </div>
            </Link>
          </div>
          <div className="hero_gradient-link-wrapper flex-1 items-stretch">
            <span className="hero_link-bg hero_bg-2 inset-1"></span>

            <Link href="/music" passHref>
              <div
                className="group rounded-lg border border-transparent bg-background px-5 py-4 transition-colors hover:border-neutral-700"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Artists & DJ{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p
                  className={`m-0 max-w-[30ch] text-sm text-textlow opacity-50`}
                >
                  Explore in depth of your favorite genre and find inspiring
                  Artists
                </p>
              </div>
            </Link>
          </div>

          <div className="hero_gradient-link-wrapper flex-1 items-stretch">
            <span className="hero_link-bg hero_bg-2 -inset-1"></span>
            <Link href="/music" passHref>
              <div
                className="group rounded-lg border border-transparent bg-background px-5 py-4 transition-colors hover:border-neutral-700"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Festivals{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p
                  className={`m-0 max-w-[30ch] text-sm text-textlow opacity-50`}
                >
                  Instantly check where your favorite Artist will play.
                </p>
              </div>
            </Link>
          </div>
          <div className="hero_gradient-link-wrapper flex-1 items-stretch">
            <span className="hero_link-bg hero_bg-3 inset-1"></span>
            <Link href="/music" passHref>
              <div
                className="group rounded-lg border border-transparent bg-background px-5 py-4 transition-colors hover:border-neutral-700 group-hover:translate-x-1 motion-reduce:transform-none"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  Fresh Frequencies
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p
                  className={`m-0 max-w-[30ch] text-sm text-textlow opacity-50`}
                >
                  Check some latest releases, prepare your caffé longo.
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          {/* <NewReleasesSection/>  */}
        </div>
      </Shell>
      <Shell
        id="hero"
        aria-labelledby="hero-heading"
        className="pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
      >
          <PageHeader id="home-shop" aria-labelledby="home-shop-header-heading">
        <PageHeaderHeading size="xl">A Store built for You with everything you would expect.</PageHeaderHeading>
      </PageHeader>
        <div className="relative mx-auto w-full max-w-[400px] py-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="button_bg-gradient-1 absolute inset-x-0 -z-10"></div>
            <div className="button_bg-gradient-2 absolute inset-x-0 -z-10"></div>
            <div className="button_bg-gradient-3 absolute inset-x-0 -z-10"></div>
            <div className="hero_gradient-button-wrapper flex-1 items-stretch ">
              <Link
                href="/shop/products"
                className={cn(
                  buttonVariants({
                    size: "lg",
                  }),
                  "hero_gradient-button hover:bg-white/80"
                )}
              >
                <Icons.chevronRight className="absolute left-1 text-textdark sm:left-4"></Icons.chevronRight>
                <span className="absolute flex items-center justify-center font-semibold text-textdark">
                  Buy Now
                </span>
                {/* <span className='absolute text-transparent bg-clip-text hero_bg-1 font-bold'>Buy Now</span>
          <span className='absolute text-transparent bg-clip-text hero_bg-2 font-bold'>Buy Now</span>
          <span className='absolute text-transparent bg-clip-text hero_bg-3 font-bold'>Buy Now</span> */}
              </Link>
            </div>

            <div className="hero_gradient-button-wrapper flex-1 items-stretch">
              <div className="hero_gradient-button-bg hero_bg-1 blur"></div>
              <div className="hero_gradient-button-bg hero_bg-2 blur"></div>
              <div className="hero_gradient-button-bg hero_bg-3 blur "></div>
              <span className="hero_button-bg hero_bg-1"></span>
              <span className="hero_button-bg hero_bg-2"></span>
              <span className="hero_button-bg hero_bg-3"></span>
              <Link
                href="/dashboard/stores"
                className={cn(
                  buttonVariants({
                    size: "lg",
                  }),
                  "hero_gradient-button-outline hover:text-theme-300 hover:bg-transparent"
                )}
              >
                <span className="absolute text-texthigh">Sell Now</span>
              </Link>
            </div>
          </div>
        </div>
      </Shell>
      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-6 py-6 md:pt-10 lg:pt-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <PageHeader id="home-categories" aria-labelledby="home-header-heading">
        <PageHeaderHeading size="lg">Categories</PageHeaderHeading>
        <PageHeaderDescription size="lg">
        Explore our categories and find the best products for you
        </PageHeaderDescription>
      </PageHeader>
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
    </>
  )
}
