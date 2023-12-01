"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import GlobalNavFlyout from "@/components/layouts/globalnav-flyout-menu"
import { Icons } from "@/components/icons/icons"
import { GlobalNavbarBottom } from "@/components/layouts/global-navbar-bottom"

export default function SiteGlobalNavMenuBurger() {
  const [isMenuOpen, setMenuOpen] = React.useState(true)

  const [isGlobalNavFlyoutOpen, setGlobalNavFlyoutOpen] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const [rotation, setRotation] = React.useState(0)
  const [scale, setScale] = React.useState(100)

  const handleNavbarClick = () => {
    setGlobalNavFlyoutOpen(!isGlobalNavFlyoutOpen)
    setMenuOpen(!isMenuOpen)
    setIsOpen(!isOpen)
    setRotation(rotation === 0 ? 90 : 0)
    setScale(scale === 100 ? 0 : 100) // Call the handleToggle prop to toggle NavbarBottom
  }
  const handleFlyoutClose = () => {
    setGlobalNavFlyoutOpen(false);
  }
  const handleFlyoutOpen = () => {
    setGlobalNavFlyoutOpen(true);
  }

  React.useEffect(() => {
    const handleScroll = () => {
      // Check if the user is scrolling down (you can adjust the threshold as needed)
      if (window.scrollY > 50) {
        // Close the GlobalNavbarBottom when scrolling down
        setMenuOpen(false);
        setIsOpen(true);

      }
    };


    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div id="site-global-nav-menu-burger" className="navbar-container invisible fixed left-0 right-0 top-0 z-20 flex h-[--headerHeight] items-center justify-end px-2 py-2 md:px-8">
        <div className="visible -z-20000">
          <Button
            size="xs"
            variant="nav"
            onClick={handleNavbarClick}
            aria-label="Toggle menu"
            className="hidden text-indexhigh hover:text-theme md:block"
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
            onClick={handleFlyoutOpen}
            className="block object-contain px-2 text-indexhigh hover:text-theme md:hidden"
          >
            <Icons.menu
              aria-hidden="true"
            />

          </Button>
          {/* <MenuBurger handleNavbarToggle={handleNavbarOpen} isOpen={isOpen} setIsOpen={setIsOpen}/> */}
        </div>
      </div>
      {isMenuOpen && <GlobalNavbarBottom />}
      {isGlobalNavFlyoutOpen && <GlobalNavFlyout handleClose={handleFlyoutClose}    />}
    </>
  )
}