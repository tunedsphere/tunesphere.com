'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import GlobalNavFlyout from '@/components/layouts/globalnav-flyout-menu'
import { Icon } from '@/components/icon'
import { GlobalNavbarBottom } from '@/components/layouts/global-navbar-bottom'

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
    setGlobalNavFlyoutOpen(false)
  }
  const handleFlyoutOpen = () => {
    setGlobalNavFlyoutOpen(true)
  }

  React.useEffect(() => {
    const handleScroll = () => {
      // Check if the user is scrolling down (you can adjust the threshold as needed)
      if (window.scrollY > 50) {
        // Close the GlobalNavbarBottom when scrolling down
        setMenuOpen(false)
        setIsOpen(true)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <>
      <div
        id="site-index-navbar-menu-burger"
        className="invisible fixed left-0 right-0 top-0 z-20 mx-auto flex h-[--globalNavHeight] w-full max-w-9xl items-center justify-end px-4 lg:px-8 5xl:max-w-[66.66666666666666%]"
      >
        <div className="visible -z-20000">
          <Button
            variant="ghostColor"
            onClick={handleNavbarClick}
            aria-label="Toggle menu"
            className="hidden text-foreground hover:text-theme md:block"
          >
            <Icon
              name="menu"
              className={`absolute hidden h-6 w-6 md:block rotate-${
                isOpen ? '0' : '90'
              } scale-${isOpen ? '100' : '0'} transition-all`}
              aria-hidden="true"
            />
            <Icon
              name="vertical-three-dots"
              className={`absolute block h-6 w-6 md:hidden rotate-${
                isOpen ? '0' : '90'
              } scale-${isOpen ? '100' : '0'} transition-all`}
              aria-hidden="true"
            />
            <Icon
              name="close"
              className={`h-6 w-6 rotate-${isOpen ? '90' : '0'} scale-${
                isOpen ? '0' : '100'
              } transition-all`}
              aria-hidden="true"
            />
          </Button>
          <Button
            variant="ghostColor"
            onClick={handleFlyoutOpen}
            className="block object-contain px-2 text-foreground hover:text-theme md:hidden"
          >
            <Icon name="menu" aria-hidden="true" className="h-6 w-6" />
          </Button>
          {/* <MenuBurger handleNavbarToggle={handleNavbarOpen} isOpen={isOpen} setIsOpen={setIsOpen}/> */}
        </div>
      </div>
      {isMenuOpen && <GlobalNavbarBottom />}
      {isGlobalNavFlyoutOpen && (
        <GlobalNavFlyout handleClose={handleFlyoutClose} />
      )}
    </>
  )
}
