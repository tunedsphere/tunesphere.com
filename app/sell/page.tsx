'use client'

import React, { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/icon'
import { ThemeToggle } from '@/components/theme-toggle'
import { ThemeProvider } from '@/components/theme-provider'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ReducedFooter } from '@/components/layouts/reduced-footer'
import { SiteFooter } from '@/components/layouts/site-footer'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { productCategories } from '@/configs/products'
interface BecomeASellerProps {}

export default function BecomeASellerPage({}: BecomeASellerProps) {
  const [isScrolledToFees, setIsScrolledToFees] = useState(false)
  const [isScrolledToTools, setIsScrolledToTools] = useState(false)
  const [isScrolledToFAQ, setIsScrolledToFAQ] = useState(false)
  const [isScrolledToIntro, setIsScrolledToIntro] = useState(false)

  const feesSectionRef = useRef(null)
  const toolsSectionRef = useRef(null)
  const faqSectionRef = useRef(null)
  const introSectionRef = useRef(null)

  const handleNavClick = (ref, margin = 144) => {
    const element = ref.current

    if (element) {
      element.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'nearest',
      })

      // Adjust scroll position with the margin after scrolling into view
      window.scrollBy(0, -margin)
    }
  }

  useEffect(() => {
    const options = {
      threshold: 0.5, // Adjust this threshold based on your needs
    }

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.target.id === 'fees') {
          setIsScrolledToFees(entry.isIntersecting)
        } else if (entry.target.id === 'tools') {
          setIsScrolledToTools(entry.isIntersecting)
        } else if (entry.target.id === 'faq') {
          setIsScrolledToFAQ(entry.isIntersecting)
        } else if (entry.target.id === 'intro') {
          setIsScrolledToIntro(entry.isIntersecting)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, options)

    const feesRef = feesSectionRef.current
    const toolsRef = toolsSectionRef.current
    const faqRef = faqSectionRef.current
    const introRef = introSectionRef.current

    if (feesRef) {
      observer.observe(feesRef)
    }
    if (toolsRef) {
      observer.observe(toolsRef)
    }
    if (faqRef) {
      observer.observe(faqRef)
    }
    if (introRef) {
      observer.observe(introRef)
    }

    // Cleanup function
    return () => {
      if (feesRef) {
        observer.unobserve(feesRef)
      }
      if (toolsRef) {
        observer.unobserve(toolsRef)
      }
      if (faqRef) {
        observer.unobserve(faqRef)
      }
      if (introRef) {
        observer.unobserve(introRef)
      }
    }
  }, [])

  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light">
        <div
          id="sell-navbar"
          className="fixed left-0 right-0 top-0 z-9999  m-0 h-auto w-full bg-background"
        >
          <nav className="navbar z-9999  mx-auto flex max-w-8xl items-center px-4 py-5 align-middle sm:grid sm:grid-cols-3 md:px-8">
            <div className="mr-5 hidden sm:block">
              <Icon name="logo" className=" h-8 w-8 text-primary " />
            </div>
            <div className="flex w-full items-center justify-start sm:justify-center">
              <Link href="/shop" aria-label="tunedsphere" id="tunedsphere">
                <h1 className="cursor-pointer text-2xl font-extrabold text-foreground">
                  TUNEDSPHERE
                  <span className="ml-2 font-mono text-base italic text-muted-foreground">
                    Shop
                  </span>
                </h1>
              </Link>
            </div>
            <div className="flex shrink-0 justify-end">
              <ThemeToggle className="mr-2" />
              <Button variant="primary" className="max-w-xs rounded-full px-4">
                Become a Seller
              </Button>
            </div>
          </nav>
        </div>
        <div>
          <div className="relative mt-[--headerHeight] flex justify-center bg-gradient-to-r from-primary/40 via-background to-primary/40 py-32">
            <Image
              alt="become-a-seller-image"
              src="/bghome/heroShop1.png"
              fill
              className="absolute z-10 object-cover opacity-20"
            />
            <div className="z-20 grid">
              <div className="col-span-1 rounded-lg p-16">
                <div className="mb-10 text-center">
                  <h1 className="text-5xl font-bold uppercase tracking-wide text-foreground">
                    Ready To Tune In?
                  </h1>
                  <p className="mt-4 text-xl text-muted-foreground">
                    Become a seller and let people dive into Your World.
                  </p>
                  <Button
                    className="mt-6 rounded-full px-8 py-2 shadow-md"
                    type="button"
                    variant="primary"
                  >
                    Start Selling
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Features Section */}

          <div className="sticky top-[--headerHeight] z-20 w-full border-b bg-background">
            <div className="bg-gradient-to-r from-primary/20 via-background to-primary/20">
              <div className="mx-auto flex max-w-8xl justify-center px-4 py-4">
                <h2 className="flex gap-8 text-base font-bold uppercase tracking-widest text-foreground">
                  <Button
                    variant="link"
                    id="intro-sticky-navigation"
                    onClick={() => handleNavClick(introSectionRef)}
                  >
                    <span
                      className={`text-lg font-medium hover:text-foreground hover:underline ${
                        isScrolledToIntro
                          ? 'text-foreground underline decoration-primary underline-offset-4'
                          : 'text-muted-foreground'
                      }`}
                    >
                      Intro
                    </span>
                  </Button>
                  <Button
                    variant="link"
                    id="fees-sticky-navigation"
                    onClick={() => handleNavClick(feesSectionRef)}
                  >
                    <span
                      className={`text-lg font-medium hover:text-foreground hover:underline ${
                        isScrolledToFees
                          ? 'text-foreground underline decoration-primary underline-offset-4'
                          : 'text-muted-foreground'
                      }`}
                    >
                      Fees
                    </span>
                  </Button>
                  <Button
                    variant="link"
                    id="tools-sticky-navigation"
                    onClick={() => handleNavClick(toolsSectionRef)}
                  >
                    <span
                      className={`text-lg font-medium underline-offset-4 hover:text-foreground hover:underline ${
                        isScrolledToTools
                          ? 'text-foreground underline decoration-primary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      Tools
                    </span>
                  </Button>

                  <Button
                    variant="link"
                    id="faq-sticky-navigation"
                    onClick={() => handleNavClick(faqSectionRef)}
                  >
                    <span
                      className={`text-lg font-medium underline-offset-4 hover:text-foreground hover:underline ${
                        isScrolledToFAQ
                          ? 'text-foreground underline decoration-primary'
                          : 'text-muted-foreground'
                      }`}
                    >
                      FAQ
                    </span>
                  </Button>
                </h2>
              </div>
            </div>
          </div>
          <section
            ref={introSectionRef}
            id="intro"
            className="relative mx-auto mt-[headerHeight] flex max-w-7xl flex-col items-center justify-center py-24"
          >
            <div className="mb-8 text-center">
              <h2 className="text-5xl font-bold">Why Choose TunedSphere?</h2>
              <p className="mt-4 text-xl tracking-wide text-muted-foreground">
                Immerse yourself in a world of creativity and imagination.
              </p>
            </div>
            <div className="mt-10 grid grid-flow-row gap-2 break-words px-4 sm:gap-4 sm:px-24 lg:grid-cols-3 lg:gap-8 lg:px-4">
              <div className="relative col-span-1 flex flex-col rounded-lg  bg-gradient-to-r from-teal-200/20 to-teal-100/90 px-2 py-4 text-center dark:from-teal-900/20  dark:to-teal-900/20 sm:p-8 ">
                <div className="mx-auto mb-4 rounded-full bg-white dark:bg-gray-950 sm:-mt-16">
                  <div className="rounded-full border border-teal-200 bg-teal-100 p-2.5 text-teal-600 dark:border-teal-900 dark:bg-teal-900/50 dark:text-teal-500">
                    <Icon name="flower" className="h-12 w-12"></Icon>
                  </div>
                </div>
                <h3 className="mt-2 text-lg font-bold sm:text-3xl">
                  Unique Artworks
                </h3>
                <p className="mt-4  grow text-lg text-muted-foreground ">
                  Showcase your art to a unique audience and be part of a
                  vibrant community of creative minds. We offer a space where
                  your artistic expression can flourish.
                </p>
                <Button
                  className="mx-auto mt-6 w-1/2 rounded-full bg-teal-500 px-2 py-2 text-white shadow-md hover:bg-teal-600 hover:text-white sm:w-2/3 sm:px-8"
                  type="button"
                >
                  Explore Art
                </Button>
              </div>
              <div className="col-span-1 flex flex-col  rounded-lg bg-gradient-to-r from-green-200/20 to-green-100/90 p-2 px-2 py-4 text-center dark:from-green-900/20 dark:to-green-900/20 sm:p-8">
                <div className="mx-auto mb-4 rounded-full bg-white dark:bg-gray-950 sm:-mt-16">
                  <div className="rounded-full border border-green-200 bg-green-100 p-2.5 text-green-600 dark:border-green-900 dark:bg-green-900/50 dark:text-green-500">
                    <Icon name="rocket" className="h-12 w-12"></Icon>
                  </div>
                </div>
                <h3 className="mt-2 text-lg font-bold sm:text-3xl">
                  Affordable Prices
                </h3>
                <p className="mt-4 grow text-lg text-muted-foreground ">
                  Our commitment is to minimize fees for vendors, directing our
                  dedicated efforts towards achieving this goal. We prioritize
                  the financial interests of our vendors, working diligently to
                  establish the most competitive fee structure in the industry.
                </p>
                <Button
                  className="mx-auto mt-6 w-2/3 rounded-full bg-green-500 px-2 py-2 font-medium text-white shadow-md  hover:bg-green-600 hover:text-white sm:px-8"
                  type="button"
                >
                  View Pricing
                </Button>
              </div>
              <div className="col-span-1 flex flex-col rounded-lg  bg-gradient-to-r from-cyan-200/20 to-cyan-100/90 p-2 px-2 py-4 text-center  dark:from-violet-900/20 dark:to-violet-900/20 sm:p-8">
                <div className="mx-auto mb-4 rounded-full bg-white dark:bg-gray-950 sm:-mt-16">
                  <div className="rounded-full border border-cyan-200 bg-cyan-100 p-2.5 text-cyan-600 dark:border-violet-900 dark:bg-violet-900/50 dark:text-violet-500">
                    <Icon name="book" className="h-12 w-12"></Icon>
                  </div>
                </div>
                <h3 className="mt-2 text-lg font-bold sm:text-3xl">
                  Community of Artists
                </h3>
                <p className="mt-4 grow text-lg text-muted-foreground">
                  Connect with talented artists and creators. Join us in shaping
                  a diverse collection of captivating artworks and connecting
                  with art enthusiasts worldwide.
                </p>
                <Button
                  className="mx-auto mt-6 w-2/3 rounded-full bg-cyan-500 px-2 py-2 font-medium text-white shadow-md hover:bg-cyan-600 hover:text-white dark:bg-violet-500 sm:px-8"
                  type="button"
                >
                  Join Us
                </Button>
              </div>
            </div>
            {/* <div className="mt-10 flex w-full flex-col items-center rounded-xl p-6 shadow-md">
            <h2 className="font-bol mb-4 text-4xl">Start Selling Your Art</h2>
            <Button
              className="rounded-full bg-orange-500 px-8 py-2 text-white shadow-md hover:bg-orange-600"
              type="button"
              variant="default"
            >
              Sell Your Art
            </Button>
          </div> */}
          </section>
          <section
            ref={feesSectionRef}
            id="fees"
            className="relative bg-gradient-to-r from-primary/0 via-primary/10 to-cyan-400/0 py-24"
          >
            <div className="mb-8 text-center">
              <h2 className="text-5xl font-bold">
                Transparent, Reliable, With Love
              </h2>
              <p className="mt-4 text-xl tracking-wide text-muted-foreground">
                No Hidden Costs, Secured Transactions, Automated Payouts, Seller
                Safeguards
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl grid-flow-row break-words px-4 sm:px-24 sm:py-16 lg:px-4">
              <div className="relative grid grid-cols-8 rounded-lg p-6 px-2 py-8">
                <div className="col-span-1 mx-auto grid grid-rows-3 items-center">
                  <div className="row-span-2 rounded-full bg-primary/20 p-2.5 text-primary">
                    <Icon name="page-layout" className="h-12 w-12"></Icon>
                  </div>
                </div>
                <div className="col-span-7 float-left ml-4 text-left">
                  <h3 className="mt-2 text-lg font-bold tracking-tight sm:text-3xl">
                    0€ Listing Products is Free* / Scale as you go
                  </h3>
                  <p className="grow text-lg text-muted-foreground ">
                    Listing up to 5 products is free, then scale as you go.
                    Listing are active for 6 months, or untill they sell.
                  </p>
                </div>
              </div>
              <div className="relative grid grid-cols-8 rounded-lg p-6 px-2 py-8">
                <div className="col-span-1 mx-auto grid grid-rows-3 items-center">
                  <div className="row-span-2 rounded-full bg-primary/20 p-2.5 text-primary">
                    <Icon name="credit-card" className="h-12 w-12"></Icon>
                  </div>
                </div>
                <div className="col-span-7 float-left ml-4 text-left">
                  <h3 className="mt-2 text-lg font-bold tracking-tight sm:text-3xl">
                    6.5 % Transaction fee, 4% + €0.30 payment processing fee*
                  </h3>
                  <p className="grow text-lg text-muted-foreground ">
                    When you sell an item, there's a small commission and
                    standard payment processing fee.
                  </p>
                </div>
              </div>
              <div className="relative grid grid-cols-8 rounded-lg p-6 px-2 py-8">
                <div className="col-span-1 mx-auto grid grid-rows-3 items-center">
                  <div className="row-span-2 rounded-full bg-primary/20 p-2.5 text-primary">
                    <Icon name="flower" className="h-12 w-12"></Icon>
                  </div>
                </div>
                <div className="col-span-7 float-left ml-4 text-left">
                  <h3 className="mt-2 text-lg font-bold tracking-tight sm:text-3xl">
                    Unique Artworks
                  </h3>
                  <p className="grow text-lg text-muted-foreground ">
                    Showcase your art to a unique audience and be part of a
                    vibrant community of creative minds. We offer a space where
                    your artistic expression can flourish.
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-8 items-center rounded-xl p-6 py-8 shadow-md">
              <div className="col-span-1">
                <Icon name="shield-check" className="h-24 w-24 text-primary">
                  Sell Your Art
                </Icon>
              </div>
              <div className="col-span-7 ml-8">
                <h2 className="text-3xl font-bold">
                  We process payments on our secure, SSL-encrypted platform, and
                  have security specialists and fraud detection systems to
                  protect you and your buyers 24/7.
                </h2>
              </div>
              <div className="col-span-8 mx-auto my-4">
                <Link
                  href="/docs/shop"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </section>
          <section
            ref={toolsSectionRef}
            id="tools"
            className="relative w-full bg-gradient-to-r from-primary/0 via-primary/30 to-cyan-400/0 py-16"
          >
            <div className="flex h-full flex-col items-center justify-center space-y-10 ">
              <h1 className="text-6xl font-extrabold tracking-wide">
                What can you sell?
              </h1>
              <p className="text-xl font-semibold text-muted-foreground">
                It's simple, Tunedsphere is a place where you can sell and
                express your art. From handmade crafts, to festsivals
                decorations.
              </p>
              <div className="flex space-x-5">
                <Button variant="primary">Explore Artworks</Button>
              </div>
              <Carousel className="w-full max-w-5xl">
                <CarouselContent className="">
                  <CarouselItem className="w-1/3 basis-1/3 ">
                    <div className="p-1">
                      <Card className="">
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <Image
                            src={productCategories[0].image}
                            alt={productCategories[0].title}
                            width={320}
                            height={320}
                            className="aspect-square "
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  {/* Carousel Item 2 - Decorations */}
                  <CarouselItem className="basis-1/3 ">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <Image
                            src={productCategories[1].image}
                            alt={productCategories[1].title}
                            width={320}
                            height={320}
                            className="aspect-square object-fill"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 ">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <Image
                            src={productCategories[2].image}
                            alt={productCategories[2].title}
                            width={320}
                            height={320}
                            className="aspect-square object-fill"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 ">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <Image
                            src={productCategories[3].image}
                            alt={productCategories[3].title}
                            width={320}
                            height={320}
                            className="aspect-square object-fill"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  <CarouselItem className="basis-1/3 ">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <Image
                            src={productCategories[4].image}
                            alt={productCategories[4].title}
                            width={320}
                            height={320}
                            className="aspect-square object-fill"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>{' '}
                  <CarouselItem className="basis-1/3 ">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <Image
                            src={productCategories[5].image}
                            alt={productCategories[5].title}
                            width={320}
                            height={320}
                            className="aspect-square object-fill"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="" />
                <CarouselNext />
              </Carousel>
            </div>
          </section>

          {/* Art Showcase Section */}
          <section
            ref={faqSectionRef}
            id="faq"
            className="relative w-full py-24"
          >
            <div className="mx-auto max-w-5xl">
              <div>
                <h3 className="mb-4 ml-4 text-4xl font-bold">
                  Freaquently Asked Questions
                </h3>
              </div>
              <Accordion
                type="single"
                collapsible
                className="w-full text-lg font-medium"
              >
                <AccordionItem
                  value="item-1"
                  className="px-4 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                >
                  <AccordionTrigger>
                    1. How do I place an order?
                  </AccordionTrigger>
                  <AccordionContent>
                    To place an order, simply browse our product catalog, choose
                    the items you want, and add them to your cart. Follow the
                    checkout process to provide your shipping details and
                    complete the payment.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="px-4 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                >
                  <AccordionTrigger>
                    2. What payment methods do you accept?
                  </AccordionTrigger>
                  <AccordionContent>
                    We accept various payment methods, including credit/debit
                    cards, PayPal, and other secure payment options. You can
                    find the available payment methods during the checkout
                    process.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="px-4 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                >
                  <AccordionTrigger>
                    3. How can I track my order?
                  </AccordionTrigger>
                  <AccordionContent>
                    Once your order has been shipped, you will receive a
                    tracking number via email. You can use this tracking number
                    to monitor the status and location of your package.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="px-4 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                >
                  <AccordionTrigger>
                    4. What is your return policy?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our return policy allows you to return items within 30 days
                    of purchase. Please review our detailed return policy for
                    more information on eligibility and the return process.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-5"
                  className="px-4 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                >
                  <AccordionTrigger>
                    5. Do you ship internationally?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer international shipping. During the checkout
                    process, you can select your country, and shipping options
                    and costs will be displayed accordingly.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div>
                <h3 className="text4xl my-8 ml-4">
                  Need more Help? Visit our shop{' '}
                  <span className="font-medium text-primary hover:underline">
                    <Link href="/docs/shop">Documentation </Link>
                  </span>
                  page
                </h3>
              </div>
            </div>
          </section>
        </div>
        <SiteFooter />
      </ThemeProvider>
    </>
  )
}
