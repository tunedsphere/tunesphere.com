
import '@/styles/globalnav.css';
import '@/styles/globals.css';

import Link from 'next/link';

import React from 'react';

import { ThemeToggle } from '@/components/theme-toggle';


import LoginModalButton from '@components/login-modal-btn'; 

import SiteHeaderMenuBurger from '@/components/menuburgers/site-header-menu-burger';
import { CartSheet } from "@/components/cart/cart-sheet"
import { SignedOut, SignedIn } from '@clerk/nextjs';

import { Icons } from '@components/icons';

import LoginNavbar from '@components/ui/login-navbar';


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
    <nav id="globalnav" className="@container globalnav fixed h-auto border-b-2 border-accent2">
      <div id="globalnav-content" className="relative">
        
        <nav className="md:bg-backgroundNavbarTop bg-background z-9999">

          <div className="py-2 navbar-container h-[--headerHeight] flex md:px-8 px-4">
          
          <div className="sm:w-1/3 hidden relative items-center sm:gap-2 sm:flex flex-row justify-start">    
          
          <Icons.logo className='absolute mx-auto right-0 left-0 -z-10 sm:block hidden'
              width={100}
              height={100}></Icons.logo>
              
            </div>
            <div className="w-4/6 flex sm:justify-center items-center left-0 px-4">
              
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h2 className="text-center text-brand hover:text-primary cursor-pointer font-extrabold md:text-[24px] md:leading-[30.24px] text-[20px] leading-[24px]">
                  TUNEDSPHERE
                </h2>
              </Link>
            </div>
            <div className="sm:w-1/3 w-2/6 relative items-center sm:gap-2 flex flex-row justify-end sm:pr-12 pr-4">
            <CartSheet />
              <div  className='hidden sm:block'>
              <ThemeToggle/>
              </div>
              <div className='flex items-center justify-center'>
              <SignedIn>
            <LoginNavbar/> 
                </SignedIn>
                <SignedOut>
                <LoginModalButton/> 
               </SignedOut>
               </div>
               {/* <MenuBurger handleNavbarToggle={handleNavbarOpen} isOpen={isOpen} setIsOpen={setIsOpen}/> */}
            </div>
            </div>
        </nav>
        <SiteHeaderMenuBurger/>
        {/* {isMenuOpen && <NavbarBottom />}
        {isGlobalNavFlyoutOpen &&
           <GlobalNavFlyout/> } */}
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

