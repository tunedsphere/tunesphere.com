import './layouts.css'
import '@/styles/globals.css'
import React from 'react'
import Link from 'next/link'

import SiteGlobalNavMenuBurger from '@/components/menuburgers/site-global-nav-menu-burger'

import { CartSheet } from '@/components/cart/cart-sheet'
import { Icon } from '@/components/icon'
import { ThemeToggle } from '@/components/theme-toggle'

import NavbarVideo from '../navbar-video'
import { IndexUserDropdownMenu } from '@/components/index-user-dropdown-menu'

export function SiteGlobalNav() {
  return (
    <>
      <nav
        id="globalnav"
        className="globalnav fixed h-auto border-b-2 border-accent-2 @container"
      >
        <div
          id="globalnav-content"
          className="relative bg-background-globalnav @container md:bg-background-globalnav/50"
        >
          <div className="mx-auto flex h-[--globalNavHeight] max-w-9xl px-4 py-2">
            <div className="relative hidden flex-row items-center justify-start gap-1 sm:flex sm:w-1/3 sm:gap-2">
              <Icon name="logo" className="z-100 h-14 w-14 text-primary" />
            </div>
            <div className="left-0 z-20 flex w-4/6 shrink items-center sm:w-1/3 sm:justify-center">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h1 className="5xl:text-2xl 8xl:text-4xl z-10 cursor-pointer text-center text-lg font-extrabold leading-[30.24px] text-indexhigh md:text-[24px]">
                  TUNEDSPHERE
                </h1>
              </Link>
            </div>
            <div className="relative flex w-2/6 shrink-0 flex-row items-center justify-end gap-1 pr-8 sm:w-1/3 sm:gap-2 sm:pr-11">
              <CartSheet className="hover:text-white" />
              <div className="hidden @sm:block">
                <ThemeToggle className="hover:text-white" />
              </div>
              <div className="flex items-center justify-center">
                <IndexUserDropdownMenu />
              </div>
            </div>
          </div>
          <SiteGlobalNavMenuBurger />
        </div>
        <NavbarVideo />
      </nav>
    </>
  )
}
