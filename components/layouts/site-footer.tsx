'use client'

import './layouts.css'
import * as React from 'react'
import Link from 'next/link'
import { siteConfig } from '@/configs/site'
import { SubscribeToNewsletterForm } from '@/components/forms/subscribe-to-newsletter-form'
import { cn } from '@/lib/utils'
interface SiteFooterProps {
  className?: string // Allow className to be optional
}
export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={`relative mx-auto max-w-8xl items-center px-4 py-8 ${
        className || ''
      }`}
    >
      <div className="absolute bottom-0 left-[37%] h-24 w-60 bg-primary blur-[140px]" />

      <div className="gap-5">
        <h1 className="py-8 text-center text-4xl font-bold text-texthigh">
          A Psychedelic dedicated Platform
        </h1>
      </div>
      <section
        id="newsletter"
        aria-labelledby="newsletter-heading"
        className="mx-auto flex max-w-2xl flex-col justify-center gap-4 space-y-3 py-4"
      >
        <p className="text-center text-base font-medium">
          Subscribe to our{' '}
          <span className="font-semibold underline decoration-primary underline-offset-4">
            Newsletter
          </span>
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
          className="max-w-screen-xl mx-auto grid grid-cols-1 gap-6 py-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {siteConfig.footerNav.map((item) => (
            <div key={item.title} className="space-y-3">
              <h1 className="text-base font-semibold underline decoration-primary underline-offset-4 md:pl-28">
                {item.title}
              </h1>
              <ul className="space-y-3">
                {item.items.map((link) => (
                  <li key={link.title} className="pl-2 text-left md:pl-28">
                    {' '}
                    {/* Adjust padding here */}
                    <Link
                      href={link.disabled ? '#' : link.href}
                      target={link?.external ? '_blank' : undefined}
                      rel={link?.external ? 'noreferrer' : undefined}
                      className={cn(
                        'text-sm font-medium text-textlow transition-colors hover:text-texthigh',
                        link.disabled && 'cursor-not-allowed opacity-80',
                        link.href, // Add a comma here
                      )}
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
        <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
          <h1 className="text-base font-extrabold text-texthigh">
            TUNEDSPHERE
          </h1>
          <p className="text-sm font-normal text-textlow">
            Copyright © 2023 - 2023 TunedSphere. All rights reserved.
          </p>
        </div>
      </section>
    </footer>
  )
}
