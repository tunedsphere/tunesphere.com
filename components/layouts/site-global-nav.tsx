"use client"
import '@/styles/globalnav.css';
import '@/styles/globals.css';
import Link from 'next/link';


import { useState } from 'react';
import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchBox } from '@/components';
import { NavbarBottom } from '@/components/navbar-bottom';
import GlobalNavFlyout from '@/components/globalnav-flyout-menu';
import { Button } from '@/components/ui/button';
import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Modal from '@/components/auth/modal';
import { UserDropdownMenu } from '@components/user-dropdown-menu';
import MenuBurger from '@components/menu-burger';
import LogInButton from '@components/login-btn';

import { useUser, WithUserProp, WithUser, SignedOut, SignedIn } from '@clerk/nextjs';

export function SiteGlobalNav() {


      const [isMenuOpen, setMenuOpen] = useState(true);
      const [isModalOpen, setModalOpen] = useState(false);
      const [isGlobalNavFlyoutOpen, setGlobalNavFlyoutOpen] = useState(false);

      const handleToggle = () => {
        setGlobalNavFlyoutOpen(!isGlobalNavFlyoutOpen);
        setMenuOpen(!isMenuOpen);
      };
      const handleModalOpen = () => {
        setModalOpen(!isModalOpen);
      };
    
  return (
    <nav id="globalnav" className="globalnav fixed h-auto @container">
      <div id="globalnav-content" className="globalnav-content relative">
        <nav className="navbar navbartop z-9999 algin-center md:px-8">
          <div className="py-3 navbar-container flex flex-between justify-between @sm:px-4 px-2">
          <div className="left-0 sm:w-1/3 sm:block hidden items-center shrink-0">         
             <SearchBox/>
            </div>
            <div className="w-4/6 flex sm:justify-center items-center left-0 @sm:px-4 px-2 shrink">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h2 className="text-center text-brand hover:text-primary algin-center cursor-pointer font-extrabold md:text-[24px] md:leading-[30.24px] text-[20px] leading-[24px]">
                  TUNEDSPHERE
                </h2>
              </Link>
            </div>
            <div className="sm:w-1/3 w-2/6 shrink-0 relative items-center sm:gap-2 gap-1 flex flex-row justify-end @sm:px-4 px-1">
            <Button 
              variant="nav"
               size="xs"
              className='hidden @sm:block px-2'>
                <Icons.cart 
                className='transition-all'/>
              </Button>
              <div  className='hidden @sm:block'>
              <ThemeToggle/>
              </div>
              <div className='flex items-center justify-center'>
              <SignedIn>
                <UserDropdownMenu />
                </SignedIn>
                <SignedOut>
                  <Button 
                  variant="logInButton"
                  className='hidden sm:block'
                  size="sm" onClick={handleModalOpen}>Sign In</Button>
                  {isModalOpen &&
               <Modal handleModalClose={handleToggle}/>}
               </SignedOut>
               </div>
               <MenuBurger handleToggle={handleToggle}/>
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
  )
}

