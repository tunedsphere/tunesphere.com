"use client"

import "@/styles/globals.css"

import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/configs/site"
import { SubscribeToNewsletterForm } from "@/components/forms/subscribe-to-newsletter-form"

import { Shell } from "@/components/shells/shell"
export function SiteFooter() {

  return (
    <footer className="relative bottom-0 mx-auto w-full items-center px-4 py-8">
      <div className="footer-gradient -z-10 w-1/5" />

      <div className="gap-5">
        <h1 className="py-8 text-center font-bold text-texthigh md:text-4xl">
          A Psychedelic dedicated Platform
        </h1>
      </div>
      <section
            id="newsletter"
            aria-labelledby="newsletter-heading"
            className="space-y-3 max-w-2xl flex flex-col justify-center mx-auto py-4 gap-4"
          >
            <h4 className="text-base font-medium text-center">
  Subscribe to our <span className="underline decoration-primary underline-offset-4 font-semibold">Newsletter</span>
</h4>
            <SubscribeToNewsletterForm />
          </section>
          <Shell>
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 lg:flex-row lg:gap-20"
        >
          <section
            id="footer-links"
            aria-labelledby="footer-links-heading"
            className="grid flex-1 grid-cols-1 gap-10 xs:grid-cols-2 sm:grid-cols-4 md:gap-32 lg:gap-56 py-8"
          >
            {siteConfig.footerNav.map((item) => (
              <div key={item.title} className="space-y-3">
                <h4 className="text-base font-medium underline decoration-primary underline-offset-4">{item.title}</h4>
                <ul className="space-y-3">
                  {item.items.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        target={link?.external ? "_blank" : undefined}
                        rel={link?.external ? "noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.title}
                        <span className="sr-only">{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </section>
        <section
          id="footer-bottom"
          aria-labelledby="footer-bottom-heading"
          className="flex items-center justify-center align-middle"
        >
<div className="flex flex-wrap justify-center items-center gap-4 pt-8">
  <h3 className="text-2xl font-extrabold text-texthigh">
    TUNEDSPHERE
  </h3>
  <p className="text-sm font-normal text-textlow opacity-75">
    Copyright © 2023 - 2023 TunedSphere. All rights reserved.
  </p>
  </div>
        </section>
      </Shell>
    </footer>
  )
}

export default SiteFooter
