"use client";
import '@/styles/globalnav.css';
import '@/styles/globals.css';

import Link from 'next/link';
import { useState } from 'react';
import React from 'react';

import { ThemeToggle } from '@/components/theme-toggle';
import { SearchBox } from '@/components';
import GlobalNavFlyout from '@/components/globalnav-flyout-menu';
import { NavbarBottom } from '@/components/navbar-bottom';

import Modal from '@/components/auth/modal';

import { UserDropdownMenu } from '@components/user-dropdown-menu';
import MenuBurger from '@components/menu-burger';
import CartSheet from "@/components/cart/cart-sheet"
import { SignedOut, SignedIn } from '@clerk/nextjs';




export function SiteHeader() {

  // Rest of the code...
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isGlobalNavFlyoutOpen, setGloisGlobalNavFlyoutOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isCartSheetOpen, setCartSheetOpen] = useState(false);

  const handleNavbarOpen = () => {
    setGloisGlobalNavFlyoutOpen(!isGlobalNavFlyoutOpen);
    setMenuOpen(!isMenuOpen);
  };
  const handleModalOpen = () => {
    setModalOpen(!isModalOpen);
  };
  const handleToggleCartSheet = () => {
    setCartSheetOpen(!isCartSheetOpen);
  };


  return (
    <nav id="globalnav" className="globalnav fixed h-auto">
      <div id="globalnav-content" className="relative">
        <nav className="bg-backgroundNavbarTop z-9999 items-center md:px-8">
          <div className="py-2 navbar-container h-[--headerHeight] flex flex-between justify-between mx-auto">
          <div className="sm:w-1/3 sm:visible invisible relative items-center sm:gap-2 gap-1 flex flex-row justify-start px-4">    
             <a>LOGO</a>
            </div>
            <div className="w-4/6 flex sm:justify-center items-center left-0 px-4">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h2 className="text-center text-brand hover:text-primary cursor-pointer font-extrabold md:text-[24px] md:leading-[30.24px] text-[20px] leading-[24px]">
                  TUNEDSPHERE
                </h2>
              </Link>
            </div>
            <div className="sm:w-1/3 w-2/6 relative items-center sm:gap-2 gap-1 flex flex-row justify-end px-4">
            <CartSheet />
              <div  className='hidden sm:block'>
              <ThemeToggle/>
              </div>
              <div className='flex items-center justify-center'>
              <SignedIn>
                <UserDropdownMenu />
                </SignedIn>
                <SignedOut>
               <Modal handleModalClose={handleModalOpen}/>
               </SignedOut>
               </div>
               <MenuBurger handleNavbarToggle={handleNavbarOpen} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
            </div>
        </nav>
        {isMenuOpen && <NavbarBottom />}
        {isGlobalNavFlyoutOpen &&
           <GlobalNavFlyout/> }
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
    </nav>
  );
}

