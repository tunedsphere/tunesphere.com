"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import GlobalNavFlyout from "@/components/layouts/globalnav-flyout-menu"
import { Icons } from "@/components/icons"
import { NavbarBottom } from "@/components/layouts/navbar-bottom"

export default function SiteHeaderMenuBurger() {
  const [isMenuOpen, setMenuOpen] = React.useState(false)

  const [isGlobalNavFlyoutOpen, setGlobalNavFlyoutOpen] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(true)

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
      <div id="site-header-menu-burger" className="navbar-container invisible fixed left-0 right-0 top-0 z-20 flex h-[--headerHeight] items-center justify-end bg-white px-2 py-2 md:px-8">
        <div className="visible z-20000">
          <Button
            size="xs"
            onClick={handleNavbarClick}
            className="z-20 hidden text-texthigh hover:text-primary md:block  hover:bg-theme-950 bg-transparent"
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
            onClick={handleNavbarClick}
            className="z-20 md:hidden block px-2 text-texthigh hover:text-primary hover:bg-theme-950 bg-transparent"
          >
            <Icons.menu
              aria-hidden="true"
            />
          </Button>
          {/* <MenuBurger handleNavbarToggle={handleNavbarOpen} isOpen={isOpen} setIsOpen={setIsOpen}/> */}
        </div>
      </div>

      {isMenuOpen && <NavbarBottom />}
      {isGlobalNavFlyoutOpen && <GlobalNavFlyout handleClose={handleFlyoutClose} />}
    </>
  )
}
