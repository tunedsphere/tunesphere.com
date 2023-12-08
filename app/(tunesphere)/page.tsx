"use client";
import "@/styles/globals.css";
import { useEffect, useRef } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import planet2 from "@/public/bghome/planet2.webp";
import { Icon } from "@/components/icon";
import { Shell } from "@/components/shells/shell";

import { PageHeader, PageHeaderHeading } from "@/components/page-header";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function MyApp() {
  return (
    <>
      <div className="md:block hidden absolute w-2/5">
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
      <Shell className="mx-auto pt-[var(--headerHeight)] flex flex-col items-center justify-between sm:pt-[var(--globalNavHeight)] md:px-8 bg-transparent">
        <div className="mt-12 md:mt-20 py-12 lg:mt-32 z-200">
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
        <div className="absolute right-gradient z-10"> </div>
        <div className="grid py-16 text-center text-indexlow lg:grid-cols-4 2xl:text-left z-200 sm:gap-2 gap-4">
          <div className="flex-1 items-stretch">
            <Link href="/music/labels">
              <div
                className="group rounded-lg border border-gray-800 bg-background-index px-5 py-4 transition-colors hover:border-primary"
                rel="noopener noreferrer"
              >
                <h2 className={`mb-3 text-indexhigh text-2xl font-semibold`}>
                  Labels{" "}
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
                <h2 className={`mb-3 text-indexhigh text-2xl font-semibold`}>
                  Artists & DJ{" "}
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
                <h2 className={`mb-3 text-indexhigh text-2xl font-semibold`}>
                  Festivals{" "}
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
                <h2 className={`mb-3 text-indexhigh text-2xl font-semibold`}>
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
          className="pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28 z-200 gap-8"
        >
          <PageHeader id="home-shop" aria-labelledby="home-shop-header-heading">
            <PageHeaderHeading
              size="xl"
              className="text-indexhigh md:py-24 py-6 tracking-tighter"
            >
              A Store built for You with everything you would expect.
            </PageHeaderHeading>
          </PageHeader>
          <div className="relative mx-auto w-full max-w-[400px] z-200 py-8">
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
                    "hero_gradient-button hover:bg-background-index/30 border-muted hover:text-white"
                  )}
                >
                  <Icon
                    name="chevron-right"
                    className="absolute left-1 sm:left-4"
                  />
                  <span className="absolute text-transparent bg-clip-text hero_bg-1 font-bold">
                    Buy Now
                  </span>
                  <span className="absolute text-transparent bg-clip-text hero_bg-2 font-bold">
                    Buy Now
                  </span>
                  <span className="absolute text-transparent bg-clip-text hero_bg-3 font-bold">
                    Buy Now
                  </span>
                </Link>
              </div>

              <div className="hero_gradient-button-wrapper flex-1 items-stretch z-200">
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
                    "hero_gradient-button-outline hover:text-theme-50 hover:bg-transparent"
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
  );
}
