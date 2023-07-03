"use client";
import './globalnavbarapp.css';
import '@/styles/globals.css';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { SignedIn, SignedOut } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { ThemeToggle } from '@/components/theme-toggle';
import { NavbarBottom, SearchBox, SearchTrigger } from '@/components';
import GlobalNavFlyout from './GlobalNav-flyout';
import { Button } from '@/components/ui/button';
import { Icons } from "@/components/icons"
import Modal from '@/components/auth/modal';




export function GlobalNav() {
  const [isSearchBoxVisible, setSearchBoxVisible] = useState(false);
  const [isNavbarBottomOpen, setIsNavbarBottomOpen] = useState(true);
  const [isGlobalNavFlyoutOpen, setIsGlobalNavFlyoutOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const [isMenuIconVisible, setMenuIconVisible] = useState(true);
  const [isIconClicked, setIsIconClicked] = useState(false);
  
  const handleNavbarBottomClick = () => {
    setIsNavbarBottomOpen(!isNavbarBottomOpen);
    setMenuIconVisible(false);

  };

  const handleGlobalNavFlyoutClick = () => {
    setIsGlobalNavFlyoutOpen(!isGlobalNavFlyoutOpen);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSearchTriggerClick = () => {
    setSearchBoxVisible(!isSearchBoxVisible);
  };

  const closeSearch = () => {
    setSearchBoxVisible(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleGlobalNavFlyoutOpen = () => {
    setIsGlobalNavFlyoutOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY === 0 && !isNavbarBottomOpen) {
        setIsNavbarBottomOpen(true);
        setHasScrolledDown(true);
      } else if (scrollY > 0 && isNavbarBottomOpen) {
        setIsNavbarBottomOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isNavbarBottomOpen]);

  return (
    <nav id="globalnav" className="globalnav fixed h-auto">
      <div id="globalnav-content" className="globalnav-content relative">
        <nav className="navbar navbartop z-9999 algin-center px-4 md:px-8">
          <div className="py-3 navbar-container flex flex-between justify-between">
            <div className="left-0 w-1/3 items-center flex">
                      
              <SearchTrigger className="" onClick={handleSearchTriggerClick} />
              {isSearchBoxVisible && <SearchBox closeSearch={closeSearch} />}
            </div>
            <div className="w-1/3 flex justify-center">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h2 className="text-center text-brand hover:text-primary algin-center cursor-pointer font-extrabold text-[24px] leading-[30.24px]">
                  TUNEDSPHERE
                </h2>
              </Link>
            </div>
            <div className="w-1/3 relative items-center gap-2 flex flex-row justify-end">
              <Button variant="nav" size="xs">
                <Icons.cart 
                className='transition-all '/>
              </Button>
              <ThemeToggle />
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Button
                  size="xs"
                  onClick={handleModalOpen}
                  variant="ghostline"
                  className="transition-all hidden md:block rounded-md text-center text-texthigh px-2 disabled:pointer-events-none ring-offset-background font-bold"
                >
                  Sign In
                </Button>
              </SignedOut>
              <Button
  size="xs"
  variant="nav"
  onClick={() => setIsNavbarBottomOpen(!isNavbarBottomOpen)}
  className='hidden md:block text-texthigh hover:text-colortheme'
>
  {isNavbarBottomOpen ? (
    <Icons.close
      className={`${
        isNavbarBottomOpen ? 'rotate-0 scale-100 transition-all' : 'rotate-90 scale-0 transition-all'
      } `}
      aria-hidden="true"
    />
  ) : (
    <Icons.menu
      className={`${
        isNavbarBottomOpen ? 'rotate-90 scale-0 transition-all' : 'rotate-0 scale-100 transition-all'
      } `}
      aria-hidden="true"
    />
  )}

</Button>
              <Button
                size="xs"
                variant="nav"
                onClick={handleGlobalNavFlyoutClick}
                className="md:hidden block"
              >
                {isGlobalNavFlyoutOpen ? (
                  <Icons.close
                    className="object-contain text-texthigh cursor-pointer"
                    aria-hidden="true"
                  />
                ) : (
                  <Icons.menu
                    className="object-contain text-texthigh cursor-pointer"
                    aria-hidden="true"
                  />
                )}
              </Button>
            </div>
          </div>
        </nav>
        {isNavbarBottomOpen && <NavbarBottom className="hidden sm:block" />}
        {isGlobalNavFlyoutOpen && (
          <GlobalNavFlyout onClose={() => setIsGlobalNavFlyoutOpen(false)} />
        )}
      </div>

      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0 hidden md:block"
        style={{ zIndex: -10 }}
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>

      {isModalOpen && (
        <Modal onClose={handleModalClose} closeModal={closeModal} />
      )}
    </nav>
  );
}

export default GlobalNav;