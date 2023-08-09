"use client"

import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import GlobalNavFlyout from "@/components/globalnav-flyout-menu"
import { Icons } from "@/components/icons"
import { NavbarBottom } from "@/components/layouts/navbar-bottom"

export default function SiteHeaderMenuBurger() {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const [isGlobalNavFlyoutOpen, setGlobalNavFlyoutOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(100)

  const handleNavbarClick = () => {
    setGlobalNavFlyoutOpen(!isGlobalNavFlyoutOpen)
    setMenuOpen(!isMenuOpen)
    setIsOpen(!isOpen)
    setRotation(rotation === 0 ? 90 : 0)
    setScale(scale === 100 ? 0 : 100) // Call the handleToggle prop to toggle NavbarBottom
  }

  return (
    <>
      <div className="navbar-container invisible fixed left-0 right-0 top-0 z-20 flex h-[--headerHeight] items-center justify-end bg-white px-2 py-2 @sm:px-4 md:px-8">
        <div className="visible -z-20000">
          <Button
            size="xs"
            variant="nav"
            onClick={handleNavbarClick}
            className="hidden text-texthigh hover:text-theme md:block"
          >
            <Icons.menu
              className={`absolute rotate-${isOpen ? "0" : "90"} scale-${
                isOpen ? "100" : "0"
              } transition-all`}
              aria-hidden="true"
            />
            <Icons.close
              className={`rotate-${isOpen ? "90" : "0"} scale-${
                isOpen ? "0" : "100"
              } transition-all`}
              aria-hidden="true"
            />
          </Button>
          <Button
            size="xs"
            variant="nav"
            onClick={handleNavbarClick}
            className="block object-contain px-2 text-texthigh hover:text-theme md:hidden"
          >
            <Icons.menu
              className={`rotate-${rotation}scale -${
                isOpen ? "0" : "100"
              } transition-all`}
              aria-hidden="true"
            />
          </Button>
          {/* <MenuBurger handleNavbarToggle={handleNavbarOpen} isOpen={isOpen} setIsOpen={setIsOpen}/> */}
        </div>
      </div>

      {isMenuOpen && <NavbarBottom />}
      {isGlobalNavFlyoutOpen && <GlobalNavFlyout />}
    </>
  )
}
