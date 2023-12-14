'use client'
import '@/styles/animation.css'
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
          width={1600}
          height={1600}
          alt="planet Home"
          className="left-0 top-0 z-10"
        />
      </div>
      <Shell className="mx-auto bg-transparent pt-[var(--headerHeight)] sm:pt-[14cqh] md:px-3">
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
              <span className="animated-grt-text_background-violet before:bg-white ">
                <span className="animated-grt-text_foreground-violet">
                  Psychedelic
                </span>
              </span>
              <span className="animated-grt-text_background-red before:bg-white">
                <span className="animated-grt-text_foreground-red">
                  Dedicated
                </span>
              </span>
              <span className="animated-grt-text_background-cyan before:bg-white">
                <span className="animated-grt-text_foreground-cyan">
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
        <div className="z-200 grid gap-4 py-16 text-indexlow sm:grid-cols-2 sm:gap-2 lg:grid-cols-4">
          <div className="flex-1 items-stretch">
            <Link href="/music/labels">
              <div
                className="group rounded-lg border border-gray-800 bg-background-index px-5 py-4 text-center transition-colors hover:border-primary sm:text-left"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold text-indexhigh`}>
                  Labels{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none ">
                    -&gt;
                  </span>
                </h2>
                <p
                  className={`mx-auto max-w-[20ch] text-center text-sm text-indexlow opacity-80 sm:m-0 sm:max-w-[30ch] sm:text-left`}
                >
                  Search & Find the label that suits your ears the most.
                </p>
              </div>
            </Link>
          </div>
          <div className="flex-1 items-stretch">
            <Link href="/music/artists">
              <div
                className="group rounded-lg border border-gray-800 bg-background-index px-5 py-4 text-center transition-colors hover:border-primary sm:text-left"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold text-indexhigh`}>
                  Artists & DJ{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p
                  className={`mx-auto max-w-[20ch] text-center text-sm text-indexlow opacity-80 sm:m-0 sm:max-w-[30ch] sm:text-left`}
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
                className="group rounded-lg border border-gray-800 bg-background-index px-5 py-4 text-center transition-colors hover:border-primary sm:text-left"
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
                  className={`mx-auto max-w-[20ch] text-center text-sm text-indexlow opacity-80 sm:m-0 sm:max-w-[30ch] sm:text-left`}
                >
                  Instantly check where your favorite Artist will play.
                </p>
              </div>
            </Link>
          </div>
          <div className="flex-1 items-stretch">
            <Link href="/music/albums">
              <div
                className="group rounded-lg border border-gray-800 bg-background-index px-5 py-4 text-center transition-colors hover:border-primary sm:text-left"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-2xl font-semibold text-indexhigh`}>
                  Fresh Frequencies
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
                <p
                  className={`mx-auto max-w-[20ch] text-center text-sm text-indexlow opacity-80 sm:m-0 sm:max-w-[30ch] sm:text-left`}
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
          className="z-200 gap-8 px-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
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
              <div className="animated-bg-grt-violet absolute inset-x-0 -z-10"></div>
              <div className="animated-bg-grt-yellow absolute inset-x-0 -z-10"></div>
              <div className="animated-bg-grt-cyan absolute inset-x-0 -z-10"></div>
              <div className="grt-button-wrapper flex-1">
                <Link
                  href="/shop/products"
                  className={cn(
                    buttonVariants({
                      size: 'lg',
                    }),
                    'grt-button  border-muted font-bold',
                  )}
                >
                  <Icon
                    name="chevron-right"
                    className="absolute left-1 sm:left-4"
                  />
                  <span className="animated-grt-text animated-grt-violet">
                    Buy Now
                  </span>
                  <span className="animated-grt-text animated-grt-yellow">
                    Buy Now
                  </span>
                  <span className="animated-grt-text animated-grt-cyan">
                    Buy Now
                  </span>
                </Link>
              </div>

              <div className="grt-button-wrapper z-200 flex-1">
                <div className="grt-btn-bg animated-grt-violet blur"></div>
                <div className="grt-btn-bg animated-grt-yellow blur"></div>
                <div className="grt-btn-bg animated-grt-cyan blur"></div>
                <span className="grt-btn-bg animated-grt-violet"></span>
                <span className="grt-btn-bg animated-grt-yellow"></span>
                <span className="grt-btn-bg animated-grt-cyan"></span>
                <Link
                  href="/dashboard/stores"
                  className={cn(
                    buttonVariants({
                      size: 'lg',
                    }),
                    'grt-button hover:bg-transparent hover:text-theme-50',
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
