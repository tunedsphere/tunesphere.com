import './layouts.css'
import '@/styles/content-grid.css'
import React from 'react'
import Link from 'next/link'

import SiteGlobalNavMenuBurger from '@/components/menuburgers/site-global-nav-menu-burger'

import { CartSheet } from '@/components/cart/cart-sheet'
import { Icon } from '@/components/icon'
import { ThemeToggle } from '@/components/theme-toggle'

import NavbarVideo from '../navbar-video'
import { IndexUserDropdownMenu } from '@/components/index-user-dropdown-menu'

export function GlobalNav() {
  return (
    <div className="bg-red-500">
      <div className="content-grid w-full items-center justify-center">
        <div className="start-header_layout navigation grow self-center align-middle">
          <div>Logo</div>
        </div>
        <div className="navigation middle-header_layout flex min-w-[30rem] shrink-0 self-center justify-self-center align-middle">
          <div className="flex w-full justify-center">TunedSphere</div>
        </div>
        <div className="end-header_layout grow">
          <div>Basket</div>
          <div>Log In</div>
          <div>Menu</div>
          <div>Icon</div>
        </div>
      </div>
    </div>
  )
}
