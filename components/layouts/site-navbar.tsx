import './layouts.css'
import React from 'react'
import Link from 'next/link'

import { Icon } from '@/components/icon'

import { CartSheet } from '@/components/cart/cart-sheet'
import SiteHeaderMenuBurger from '@/components/menuburgers/site-header-menu-burger'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserDropDownMenu } from '../user-dropdown-menu'

interface SiteNavbarProps {}

export function SiteNavbar({}: SiteNavbarProps) {
  return (
    <nav id="globalnav" className="/70 fixed h-auto border-b-2 @container">
      <div id="globalnav-content" className="relative">
        <div className="bg-background-navbartop">
          <div className="5xl:max-w-[66.66666666666666%] mx-auto flex h-[--headerHeight] w-full max-w-9xl px-4 lg:px-8">
            <div className="relative hidden flex-row items-center justify-start sm:flex sm:w-1/3 sm:gap-2">
              <Icon
                name="logo"
                className="absolute left-0 right-0 z-10 hidden h-10 w-10 text-primary sm:block"
              />
            </div>
            <div className="left-0 flex w-1/3 items-center sm:justify-center md:w-4/6">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h1 className="cursor-pointer text-center text-lg font-extrabold leading-9 text-texthigh md:text-2xl">
                  TUNEDSPHERE
                </h1>
              </Link>
            </div>
            <div className="relative flex w-2/3 flex-grow flex-row items-center justify-end pr-12 sm:w-1/3 sm:gap-2">
              <CartSheet />
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-center">
                <UserDropDownMenu />
              </div>
            </div>
          </div>
        </div>
        <SiteHeaderMenuBurger />
      </div>
    </nav>
  )
}
