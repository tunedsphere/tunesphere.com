"use client"
import '@/styles/globalnav.css';
import '@/styles/globals.css';

import Link from 'next/link';

import { useState } from 'react';
import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import SearchBox from '@/components/SearchBox/search-box';
import { NavbarBottom } from '@/components/navbar-bottom';
import GlobalNavFlyout from '@/components/globalnav-flyout-menu';
import { Button } from '@/components/ui/button';
import { Icons } from "@/components/icons"

import Modal from '@/components/auth/modal';
import { UserDropdownMenu } from '@components/user-dropdown-menu';
import MenuBurger from '@components/navbar-menu-burger';
import CartSheet from "@/components/cart/cart-sheet"

import { SignedOut, SignedIn } from '@clerk/nextjs';

export function SiteGlobalNav() {
      const [isMenuOpen, setMenuOpen] = useState(true);
      const [isModalOpen, setModalOpen] = useState(false);
      const [isGlobalNavFlyoutOpen, setGlobalNavFlyoutOpen] = useState(false);
      const [isOpen, setIsOpen] = useState(false); 

      const handleNavbarOpen = () => {
        setGlobalNavFlyoutOpen(!isGlobalNavFlyoutOpen);
        setMenuOpen(!isMenuOpen);
      };
      const handleModalOpen = () => {
        setModalOpen(!isModalOpen);
      };
    
  return (
    <>
    <nav id="globalnav" className="@container globalnav fixed h-auto border-b-2 border-accent2">
      <div id="globalnav-content" className="relative">
        
        <nav className="md:bg-backgroundNavbarTop bg-background z-9999 md:px-8">

          <div className="py-2 navbar-container h-[--headerHeight] flex @sm:px-4 px-2">
          
          <div className="sm:w-1/3 hidden relative items-center sm:gap-2 gap-1 sm:flex flex-row justify-start px-4">    
         
             <Icons.logo className=''
              width={72}
              height={72}></Icons.logo>
              
            </div>
            <div className="sm:w-1/3 w-4/6 z-20 flex sm:justify-center items-center left-0 @sm:px-4 px-2 shrink">
            {/* <Icons.logo className='absolute mx-auto right-0 left-0 -z-10 sm:block hidden'
              width={100}
              height={100}></Icons.logo> */}
              
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                
                <h2 className="z-10 text-center text-brand hover:text-primary cursor-pointer font-extrabold text-[24px] leading-[30.24px]">
                  TUNEDSPHERE
                </h2>
              </Link>

            </div>
            <div className="sm:w-1/3 w-2/6 shrink-0 relative items-center sm:gap-2 gap-1 flex flex-row justify-end">
            <SearchBox/>
            <CartSheet />
              
              <div  className='hidden @sm:block'>
              <ThemeToggle/>
              </div>
              <div className='flex items-center justify-center'>
              <SignedIn>
                <UserDropdownMenu />
                </SignedIn>
               <SignedOut>
                  <Button 
                  variant="outlineTheme"
                  className='hidden sm:block shrink-0 font-semibold px-2'
                  size="xs" onClick={handleModalOpen}>Log In</Button>
               </SignedOut>
               </div>
               <MenuBurger handleNavbarToggle={handleNavbarOpen} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </div>
          </div>
        </nav>
        {isMenuOpen && <NavbarBottom />}
        {isGlobalNavFlyoutOpen && <GlobalNavFlyout/> }
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
    {isModalOpen && <Modal handleModalClose={handleModalOpen}/>}
    </>
  )
}

