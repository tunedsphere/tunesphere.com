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
    <nav id="globalnav" className="fixed h-auto border-b-2 @container">
      <div id="globalnav-content" className="relative">
        <div className="bg-background-navbartop">
          <div className="5xl:max-w-[66.66666666666666%] mx-auto flex h-[--headerHeight] w-full max-w-9xl px-4 lg:px-8">
            <div className="relative hidden flex-row items-center justify-start lg:flex lg:w-1/3 lg:gap-2">
              <Icon
                name="logo"
                className="absolute left-0 right-0 z-10 hidden h-8 w-8 text-primary lg:block"
              />
            </div>
            <div className="relative left-0 flex w-1/3 items-center align-middle lg:w-4/6 lg:justify-center">
              <Link
                href="/"
                aria-label="tunedsphere"
                id="tunedsphere"
                className="flex "
              >
                <Icon
                  name="logo"
                  className="z-10 mr-2 block h-8 w-8 shrink-0 text-primary lg:hidden"
                />

                <h1 className="cursor-pointer text-2xl font-extrabold leading-9 text-foreground">
                  TUNEDSPHERE
                </h1>
              </Link>
            </div>
            <div className="relative flex w-2/3 flex-grow flex-row items-center justify-end pr-12 lg:w-1/3 lg:gap-1">
              <CartSheet />
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
              <div className="ml-2 flex items-center justify-center">
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
