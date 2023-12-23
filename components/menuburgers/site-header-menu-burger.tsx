'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import GlobalNavFlyout from '@/components/layouts/globalnav-flyout-menu'
import { Icon } from '@/components/icon'
import { NavbarBottom } from '@/components/layouts/navbar-bottom'

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
        id="site-navbar-menu-burger"
        className="invisible fixed left-0 right-0 top-0 z-20 mx-auto flex h-[--globalNavHeight] w-full max-w-9xl items-center justify-end px-4 lg:px-8 5xl:max-w-[66.66666666666666%]"
      >
        <div className="visible z-20000">
          <Button
            size="xs"
            onClick={handleNavbarClick}
            aria-label="Toggle menu"
            className="z-20 hidden bg-transparent text-texthigh hover:bg-theme-950 hover:text-primary md:block"
          >
            <Icon
              name="menu"
              className={`absolute h-6 w-6 rotate-${
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
            size="xs"
            onClick={handleNavbarClick}
            className="z-20 block bg-transparent px-2 text-texthigh hover:bg-theme-950 hover:text-primary md:hidden"
          >
            <Icon
              name="vertical-three-dots"
              aria-hidden="true"
              className="h-6 w-6"
            />
          </Button>
        </div>
      </div>

      {isMenuOpen && <NavbarBottom />}
      {isGlobalNavFlyoutOpen && (
        <GlobalNavFlyout handleClose={handleFlyoutClose} />
      )}
    </>
  )
}
