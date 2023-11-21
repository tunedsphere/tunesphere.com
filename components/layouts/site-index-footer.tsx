"use client"
import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/configs/site"
import { SubscribeToNewsletterForm } from "@/components/forms/subscribe-to-newsletter-form"

export function SiteIndexFooter() {

  return (
    <footer className="relative bg-background-index max-w-8xl bottom-0 mx-auto w-full items-center px-4 py-8">
      <div className="footer-gradient -z-10 w-1/5" />

      <div className="gap-5">
        <h1 className="py-8 text-center font-bold text-indexhigh text-4xl">
          A Psychedelic dedicated Platform
        </h1>
      </div>
      <section
            id="newsletter"
            aria-labelledby="newsletter-heading"
            className="space-y-3 max-w-2xl flex flex-col justify-center mx-auto py-4 gap-4"
          >
            <p className="text-base font-medium text-center text-indexlow">
  Subscribe to our <span className="underline decoration-primary underline-offset-4 font-semibold text-indexhigh">Newsletter</span>
</p>
            <SubscribeToNewsletterForm />
          </section>

<section
  id="footer-content"
  aria-labelledby="footer-content-heading"
  className="py-4"
>
  <section
    id="footer-links"
    aria-labelledby="footer-links-heading"
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8 max-w-screen-xl mx-auto"
  >
    {siteConfig.footerNav.map((item) => (
      <div key={item.title} className="space-y-3">
        <h1 className="text-base text-indexhigh font-medium underline decoration-primary underline-offset-4 md:pl-28">{item.title}</h1>
        <ul className="space-y-3">
          {item.items.map((link) => (
            <li key={link.title} className="text-left pl-2 md:pl-28"> {/* Adjust padding here */}
              <Link
                href={link.href}
                target={link?.external ? "_blank" : undefined}
                rel={link?.external ? "noreferrer" : undefined}
                className="text-sm text-muted-foreground transition-colors"
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
  <h1 className="text-2xl font-extrabold text-indexhigh">
    TUNEDSPHERE
  </h1>
  <p className="text-sm font-normal text-indexlow opacity-75">
    Copyright © 2023 - 2023 TunedSphere. All rights reserved.
  </p>
  </div>
        </section>
    </footer>
  )
}

export default SiteIndexFooter
