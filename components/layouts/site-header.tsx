
import "@/styles/globals.css"

import React from "react"
import Link from "next/link"

import { Icons } from "@/components/icons"

import LoginNavbar from "@/components/login-navbar"

import { CartSheet } from "@/components/cart/cart-sheet"
import SiteHeaderMenuBurger from "@/components/menuburgers/site-header-menu-burger"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  // // Rest of the code...
  // const [isMenuOpen, setMenuOpen] = useState(false);
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [isGlobalNavFlyoutOpen, setGloisGlobalNavFlyoutOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(true);
  // const [isCartSheetOpen, setCartSheetOpen] = useState(false);

  // const handleNavbarOpen = () => {
  //   setGloisGlobalNavFlyoutOpen(!isGlobalNavFlyoutOpen);
  //   setMenuOpen(!isMenuOpen);
  // };
  // const handleModalOpen = () => {
  //   setModalOpen(!isModalOpen);
  // };
  // const handleToggleCartSheet = () => {
  //   setCartSheetOpen(!isCartSheetOpen);
  // };

  return (
    <nav
      id="globalnav"
      className="globalnav fixed h-auto border-b-2 border-accent-2 @container z-9999"
    >
      <div id="globalnav-content" className="relative">
        <nav className="z-9999 bg-background-navbartop">
          <div className="navbar-container flex h-[--headerHeight] px-4 py-2 md:px-8">
            <div className="relative hidden flex-row items-center justify-start sm:flex sm:w-1/3 sm:gap-2">
              <Icons.logo
                className="absolute left-0 right-0 z-10 hidden sm:block text-primary"
                width={54}
              height={54}
              ></Icons.logo>
            </div>
            <div className="left-0 flex w-4/6 items-center sm:justify-center">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h2 className="cursor-pointer text-center text-[20px] font-extrabold leading-[24px] text-brand hover:text-primary md:text-[24px] md:leading-[30.24px]">
                  TUNEDSPHERE
                </h2>
              </Link>
            </div>
            <div className="relative flex w-2/6 flex-row items-center justify-end sm:pr-11 pr-8 sm:w-1/3 sm:gap-2">
              <CartSheet />
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-center">
                <LoginNavbar />
              </div>
            </div>
          </div>
        </nav>
        <SiteHeaderMenuBurger />
      </div>
    </nav>
  )
}
