'use client'
import '@/styles/gradient-hero-text.css'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import planet2 from '@/public/bghome/planet2.webp'
import { Icon } from '@/components/icon'
import { Shell } from '@/components/shells/shell'

import { PageHeader, PageHeaderHeading } from '@/components/page-header'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default function MyApp() {
  return (
    <>
      <div className="absolute hidden w-2/5 md:block">
        <Image
          src={planet2}
          placeholder="blur"
          width={500}
          height={500}
          alt="planet Home"
          layout="responsive"
          className="left-0 top-0 z-10"
        />
      </div>
      <Shell className="mx-auto bg-transparent pt-[var(--headerHeight)] sm:pt-[var(--globalNavHeight)] md:px-3">
        <div className="z-200 mt-12 py-12 md:mt-20 lg:mt-32">
          <PageHeader
            id="home-shop"
            aria-label="A Psychedelic Dedicated Platform"
          >
            <PageHeaderHeading
              size="xxl"
              className="hero_title justify-center gap-2 text-center"
            >
              <span className="text-indexhigh">A </span>
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
            </PageHeaderHeading>
          </PageHeader>

          <p className="hero_description py-4 text-center text-lg font-normal text-indexlow lg:text-xl">
            Explore the musical realm of Psychedelic Art, with Music, Art,
            Decorations, and Festivals
          </p>
        </div>

        <div className="left-gradient -z-10"> </div>
        <div className="right-gradient absolute z-10"> </div>
        <div className="z-200 grid gap-4 py-16 text-center text-indexlow sm:gap-2 lg:grid-cols-4 2xl:text-left">
          <div className="flex-1 items-stretch">
            <Link href="/music/labels">
              <div
                className="group rounded-lg border border-gray-800 bg-background-index px-5 py-4 transition-colors hover:border-primary"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold text-indexhigh`}>
                  Labels{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p
                  className={`m-0 max-w-[30ch] text-sm text-indexlow opacity-80`}
                >
                  Search & Find the label that suits your ears the most.
                </p>
              </div>
            </Link>
          </div>
          <div className="flex-1 items-stretch">
            <Link href="/music/artists">
              <div
                className="group rounded-lg border border-gray-800 bg-background-index px-5 py-4 transition-colors hover:border-primary"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold text-indexhigh`}>
                  Artists & DJ{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p
                  className={`m-0 max-w-[30ch] text-sm text-indexlow opacity-80`}
                >
                  Explore in depth of your favorite genre and find inspiring
                  Artists
                </p>
              </div>
            </Link>
          </div>

          <div className="flex-1 items-stretch">
            <Link href="/fesitvals">
              <div
                className="group rounded-lg border border-gray-800 bg-background-index px-5 py-4 transition-colors hover:border-primary"
                rel="noopener noreferrer"
              >
                <h2
                  className={`mb-3 px-1 text-2xl font-semibold text-indexhigh`}
                >
                  Festivals{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p
                  className={`m-0 max-w-[30ch] text-sm text-indexlow opacity-80`}
                >
                  Instantly check where your favorite Artist will play.
                </p>
              </div>
            </Link>
          </div>
          <div className="flex-1 items-stretch">
            <Link href="/music/albums">
              <div
                className="group rounded-lg border border-gray-800 bg-background-index px-5 py-4 transition-colors hover:border-primary group-hover:translate-x-1 motion-reduce:transform-none"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold text-indexhigh`}>
                  Fresh Frequencies
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p
                  className={`m-0 max-w-[30ch] text-sm text-indexlow opacity-80`}
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
        <section
          id="hero"
          aria-labelledby="hero-heading"
          className="z-200 gap-8 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
        >
          <PageHeader id="home-shop" aria-labelledby="home-shop-header-heading">
            <PageHeaderHeading
              size="xl"
              className="py-6 tracking-tighter text-indexhigh md:py-24"
            >
              A Store built for You with everything you would expect.
            </PageHeaderHeading>
          </PageHeader>
          <div className="relative z-200 mx-auto w-full max-w-[400px] py-8">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="button_bg-gradient-1 absolute inset-x-0 -z-10"></div>
              <div className="button_bg-gradient-2 absolute inset-x-0 -z-10"></div>
              <div className="button_bg-gradient-3 absolute inset-x-0 -z-10"></div>
              <div className="hero_gradient-button-wrapper flex-1 items-stretch ">
                <Link
                  href="/shop/products"
                  className={cn(
                    buttonVariants({
                      size: 'lg',
                    }),
                    'hero_gradient-button border-muted hover:bg-background-index/30 hover:text-white',
                  )}
                >
                  <Icon
                    name="chevron-right"
                    className="absolute left-1 sm:left-4"
                  />
                  <span className="hero_bg-1 absolute bg-clip-text font-bold text-transparent">
                    Buy Now
                  </span>
                  <span className="hero_bg-2 absolute bg-clip-text font-bold text-transparent">
                    Buy Now
                  </span>
                  <span className="hero_bg-3 absolute bg-clip-text font-bold text-transparent">
                    Buy Now
                  </span>
                </Link>
              </div>

              <div className="hero_gradient-button-wrapper z-200 flex-1 items-stretch">
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
                      size: 'lg',
                    }),
                    'hero_gradient-button-outline hover:bg-transparent hover:text-theme-50',
                  )}
                >
                  <span className="absolute">Sell Now</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Shell>
    </>
  )
}
