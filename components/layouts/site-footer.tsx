"use client"

import "./layouts.css"
import * as React from "react"
import Link from "next/link"
import { siteConfig } from "@/configs/site"
import { SubscribeToNewsletterForm } from "@/components/forms/subscribe-to-newsletter-form"

export function SiteFooter() {

  return (
    <footer className="relative mx-auto max-w-8xl items-center px-4 py-8">
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
            <p className="text-base font-medium text-center">
  Subscribe to our <span className="underline decoration-primary underline-offset-4 font-semibold">Newsletter</span>
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
        <h4 className="text-base font-medium underline decoration-primary underline-offset-4 md:pl-28">{item.title}</h4>
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
  <h5 className="text-2xl font-extrabold text-texthigh">
    TUNEDSPHERE
  </h5>
  <p className="text-sm font-normal text-textlow opacity-75">
    Copyright © 2023 - 2023 TunedSphere. All rights reserved.
  </p>
  </div>
        </section>
    </footer>
  )
}

export default SiteFooter
