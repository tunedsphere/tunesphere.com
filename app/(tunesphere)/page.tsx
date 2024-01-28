'use client'
import '@/styles/animation.css'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import planet2 from '@/public/bghome/planet2.png'
import { Icon } from '@/components/icon'
import { Shell } from '@/components/shells/shell'

import { PageHeader, PageHeaderHeading } from '@/components/page-header'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

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
      <section>
        <Shell className="mx-auto pt-[var(--headerHeight)] sm:pt-[14cqh] md:px-3">
          <div className="z-200 mt-12 py-12 md:mt-20 lg:mt-32">
            <PageHeader
              id="home-shop"
              aria-label="A Psychedelic Dedicated Platform"
            >
              <PageHeaderHeading
                size="xxl"
                className="hero_title animate-slideIn justify-center gap-2 opacity-0 [--slideIn-delay:300ms] "
              >
                <span className="text-foreground">A </span>
                <span className="animated-grt-text_background-violet ">
                  <span className="animated-grt-text_foreground-violet">
                    Psygroove
                  </span>
                </span>
                <span className="animated-grt-text_background-red ">
                  <span className="animated-grt-text_foreground-red">
                    Dedicated
                  </span>
                </span>
                <span className="animated-grt-text_background-cyan before:bg-foreground">
                  <span className="animated-grt-text_foreground-cyan">
                    Platform
                  </span>
                </span>
              </PageHeaderHeading>
            </PageHeader>

            <p className="animate-slideIn py-4 text-center text-lg text-textlow opacity-0 [--slideIn-delay:500ms] lg:text-xl">
              Explore the musical realm of Psychedelic Art, with Music, Art,
              Decorations, and Festivals
            </p>
          </div>
        </Shell>
      </section>
      <Shell>
        {/* <div className="right-gradient absolute z-10"> </div> */}
        <ol className="group/list grid gap-4 px-4 py-16 text-textlow sm:grid-cols-2 sm:grid-rows-2 sm:gap-2 md:px-8 xl:grid-cols-4 xl:grid-rows-1">
          <Link
            href="/music/labels"
            className="animate-slideIn group relative grid cursor-pointer rounded-lg border p-4 leading-relaxed text-textlow opacity-0 transition-all [--slideIn-delay:600ms] hover:border-primary hover:!opacity-100 group-hover/list:opacity-40"
          >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 block rounded-lg from-indigo-900/20 to-purple-900/20 blur-lg transition group-hover:bg-gradient-to-r group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] group-hover:drop-shadow-lg motion-reduce:transition-none lg:-inset-x-6"></div>

            <div className="z-10 grid w-full">
              <h3 className="mb-3 text-2xl font-semibold leading-snug text-foreground focus-visible:text-secondary">
                Labels{' '}
                <span className="hidden text-base transition-transform group-hover:translate-x-1 motion-reduce:transform-none sm:inline-block">
                  -&gt;
                </span>
              </h3>
              <p className="text-textlow">
                Search & Find the label that suits your ears the most.
              </p>
            </div>
          </Link>

          <Link
            href="/music/artists"
            className="animate-slideIn group relative grid cursor-pointer rounded-lg border p-4 leading-relaxed text-textlow opacity-0 transition-all [--slideIn-delay:800ms] hover:border-primary hover:!opacity-100 group-hover/list:opacity-40"
          >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 block rounded-lg from-indigo-900/20 to-purple-900/20 blur-lg transition group-hover:bg-gradient-to-r group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] group-hover:drop-shadow-lg motion-reduce:transition-none lg:-inset-x-6"></div>

            <div className="z-10 grid w-full">
              <h3 className="mb-3 text-2xl font-semibold leading-snug text-foreground focus-visible:text-secondary">
                Artists & DJ{' '}
                <span className="hidden text-base transition-transform group-hover:translate-x-1 motion-reduce:transform-none sm:inline-block">
                  -&gt;
                </span>
              </h3>
              <p className="text-textlow">
                Explore in depth of your favorite genre and find inspiring
                Artists
              </p>
            </div>
          </Link>

          <Link
            href="/music/festivals"
            className="animate-slideIn group relative grid cursor-pointer rounded-lg border p-4 leading-relaxed text-textlow opacity-0 transition-all [--slideIn-delay:1000ms] hover:border-primary hover:!opacity-100 group-hover/list:opacity-40"
          >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 block rounded-lg from-indigo-900/20 to-purple-900/20 blur-lg transition group-hover:bg-gradient-to-r group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] group-hover:drop-shadow-lg motion-reduce:transition-none lg:-inset-x-6"></div>

            <div className="z-10 grid w-full">
              <h3 className="mb-3 text-2xl font-semibold leading-snug text-foreground focus-visible:text-secondary">
                Festivals{' '}
                <span className="hidden text-base transition-transform group-hover:translate-x-1 motion-reduce:transform-none sm:inline-block">
                  -&gt;
                </span>
              </h3>
              <p className="text-textlow">
                Instantly check where your favorite Artist will play.
              </p>
            </div>
          </Link>

          <Link
            href="/music"
            className="animate-slideIn group relative grid cursor-pointer rounded-lg border p-4 leading-relaxed text-textlow opacity-0  transition-all [--slideIn-delay:1200ms] hover:border-primary hover:!opacity-100 group-hover/list:opacity-40"
          >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 block rounded-lg from-indigo-900/20 to-purple-900/20 blur-lg transition group-hover:bg-gradient-to-r group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] group-hover:drop-shadow-lg motion-reduce:transition-none lg:-inset-x-6"></div>

            <div className="z-10 grid w-full">
              <h3 className="mb-3 text-2xl font-semibold leading-snug text-foreground focus-visible:text-secondary">
                Fresh Frequencies{' '}
                <span className="hidden text-base transition-transform group-hover:translate-x-1 motion-reduce:transform-none sm:inline-block">
                  -&gt;
                </span>
              </h3>
              <p className="text-textlow">
                Explore in depth of your favorite genre and find inspiring
                Artists
              </p>
            </div>
          </Link>
        </ol>
      </Shell>
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="z-200 gap-8 px-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
      >
        <PageHeader
          className="mx-auto max-w-5xl"
          id="home-shop"
          aria-labelledby="home-shop-header-heading"
        >
          <PageHeaderHeading
            size="xl"
            className="py-6 tracking-tighter text-foreground md:py-24"
          >
            A Store built for You with everything you would expect.
          </PageHeaderHeading>
        </PageHeader>
        <div className="relative z-200 mx-auto max-w-[32rem] py-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* <div className="animated-bg-grt-violet !important absolute inset-x-0 -z-10"></div>
              <div className="animated-bg-grt-yellow !important absolute inset-x-0 -z-10"></div>
              <div className="animated-bg-grt-cyan !important absolute inset-x-0 -z-10"></div> */}
            <div className="grt-button-wrapper group flex-1">
              <Link
                href="/shop/products"
                className={cn(
                  buttonVariants({
                    size: 'xl',
                  }),
                  'bg-white/90 font-bold',
                )}
              >
                <Icon
                  name="chevron-right"
                  className="absolute left-1 text-black sm:left-4"
                />
                <span className="animated-grt-text animated-grt-violet group-hover:text-black">
                  Buy Now
                </span>
                <span className="animated-grt-text animated-grt-yellow group-hover:text-black">
                  Buy Now
                </span>
                <span className="animated-grt-text animated-grt-cyan group-hover:text-black">
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
                href="/sell"
                className={cn(
                  buttonVariants({
                    size: 'xl',
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
    </>
  )
}
