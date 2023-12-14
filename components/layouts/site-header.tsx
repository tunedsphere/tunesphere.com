import './layouts.css'
import React from 'react'
import Link from 'next/link'

import { Icon } from '@/components/icon'

import { CartSheet } from '@/components/cart/cart-sheet'
import SiteHeaderMenuBurger from '@/components/menuburgers/site-header-menu-burger'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserDropDownMenu } from '../user-dropdown-menu'

interface SiteHeaderProps {}

export function SiteHeader({}: SiteHeaderProps) {
  return (
    <nav
      id="globalnav"
      className="fixed h-auto border-b-2 border-muted/70 @container"
    >
      <div id="globalnav-content" className="relative">
        <nav className="bg-background-navbartop">
          <div className="6xl:max-w-12xl mx-auto flex h-[--headerHeight] max-w-9xl px-4 py-2 md:px-8">
            <div className="relative hidden flex-row items-center justify-start sm:flex sm:w-1/3 sm:gap-2">
              <Icon
                name="logo"
                className="absolute left-0 right-0 z-10 hidden h-[2cqi] w-[2cqi] text-primary sm:block"
              />
            </div>
            <div className="left-0 flex w-4/6 items-center sm:justify-center">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h1 className="6xl:text-6xl cursor-pointer text-center text-lg font-extrabold leading-[24px] text-texthigh md:text-[24px] md:leading-[30.24px]">
                  TUNEDSPHERE
                </h1>
              </Link>
            </div>
            <div className="relative flex w-2/6 flex-row items-center justify-end pr-8 sm:w-1/3 sm:gap-2 sm:pr-11">
              <CartSheet />
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-center">
                <UserDropDownMenu />
              </div>
            </div>
          </div>
        </nav>
        <SiteHeaderMenuBurger />
      </div>
    </nav>
  )
}
