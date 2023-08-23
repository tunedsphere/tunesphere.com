
import "@/styles/globals.css"

import React from "react"
import Link from "next/link"

import LoginNavbar from "@/components/login-navbar"
import SiteGlobalNavMenuBurger from "@/components/menuburgers/site-global-nav-menu-burger"
import { SiteCombobox } from "@/components/site-combobox"

import { CartSheet } from "@/components/cart/cart-sheet"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

import NavbarVideo from "../navbar-video"
export function SiteGlobalNav() {

  return (
    <>
      <nav
        id="globalnav"
        className="globalnav fixed h-auto border-b-2 border-accent-2 @container"
      >
        <div
          id="globalnav-content"
          className="relative bg-background-globalnav md:bg-background-globalnav/50"
        >
          <div className="navbar-container flex h-[--headerHeight] px-4 py-2 md:px-8">
            <div className="relative hidden flex-row items-center justify-start gap-1 sm:flex sm:w-1/3 sm:gap-2">
              <Icons.logo className="" width={72} height={72}></Icons.logo>
            </div>
            <div className="left-0 z-20 flex w-4/6 shrink items-center sm:w-1/3 sm:justify-center">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h2 className="z-10 cursor-pointer text-center text-[24px] font-extrabold leading-[30.24px] text-brand hover:text-primary">
                  TUNEDSPHERE
                </h2>
              </Link>
            </div>
            <div className="relative flex w-2/6 shrink-0 flex-row items-center justify-end gap-1 sm:pr-11 pr-8 sm:w-1/3 sm:gap-2">
              <SiteCombobox />
              <CartSheet />
              <div className="hidden @sm:block">
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-center">
                <LoginNavbar />
              </div>
            </div>
          </div>
          <SiteGlobalNavMenuBurger />
        </div>
        <NavbarVideo/>
        {/* <video
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 z-10 hidden h-full w-full object-cover md:block"
          style={{ zIndex: -10 }}
        >
          <source src="/bgvideo.mp4" type="video/mp4" />
        </video> */}
      </nav>
    </>
  )
}
