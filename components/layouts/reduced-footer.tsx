'use client'

import './layouts.css'
import Link from 'next/link'
import * as React from 'react'
import { Icon } from '@/components/icon'

export function ReducedFooter() {
  return (
    <footer
      className="top[100%] fixed bottom-0 mx-auto flex w-full items-center justify-between overflow-x-auto  border-t bg-background px-4 py-2 align-middle"
      id="reduced-footer-bottom"
      aria-labelledby="reduced-footer-bottom-heading"
    >
      <div className="hidden flex-wrap items-center justify-center gap-2 sm:flex">
        <h5 className="text-base font-extrabold text-texthigh">TUNEDSPHERE</h5>
        <p className="text-sm font-normal text-textlow opacity-75">
          Copyright © 2023
        </p>
      </div>
      <div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/docs/what-is-tunedsphere/about-us">
              <span className="text-sm font-normal text-textlow opacity-75 hover:text-texthigh">
                About
              </span>
            </Link>
          </li>
          <li>
            <Link href="/docs/what-is-tunedsphere/contact">
              <span className="text-sm font-normal text-textlow opacity-75 hover:text-texthigh">
                Contact
              </span>
            </Link>
          </li>
          <li>
            <Link href="/docs/legal/terms">
              <span className="text-sm font-normal text-textlow opacity-75 hover:text-texthigh">
                Terms
              </span>
            </Link>
          </li>
          <li>
            <Link href="/docs/privacy">
              <span className="text-sm font-normal text-textlow opacity-75 hover:text-texthigh">
                Privacy
              </span>
            </Link>
          </li>
          <li>
            <Link href="/" className="">
              <Icon name="logo" className="h-6 w-6" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
