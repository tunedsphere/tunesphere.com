
import '@/styles/globalnav.css';
import '@/styles/globals.css';

import Link from 'next/link';

import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';


import { Icons } from "@/components/icons"
import SiteGlobalNavMenuBurger from '@components/menuburgers/site-global-nav-menu-burger';
import { CartSheet } from "@/components/cart/cart-sheet"
import { SiteCombobox } from '@components/site-combobox';
import { SignedOut, SignedIn } from '@clerk/nextjs';

import LoginNavbar from '@components/ui/login-navbar';
export function SiteGlobalNav() {

      // const [isMenuOpen, setMenuOpen] = useState(true);

      // const [isGlobalNavFlyoutOpen, setGlobalNavFlyoutOpen] = useState(false);
      // const [isOpen, setIsOpen] = useState(false); 

      // const handleNavbarOpen = () => {
      //   setGlobalNavFlyoutOpen(!isGlobalNavFlyoutOpen);
      //   setMenuOpen(!isMenuOpen);
      // };

    
  return (
    <>
    <nav id="globalnav" className="@container globalnav fixed h-auto border-b-2 border-accent2">
      <div id="globalnav-content" className="relative">
        
        <nav className="md:bg-backgroundNavbarTop bg-background z-9999">

          <div className="py-2 navbar-container h-[--headerHeight] flex md:px-8 px-4">
          
          <div className="sm:w-1/3 hidden relative items-center sm:gap-2 gap-1 sm:flex flex-row justify-start">    
         
             <Icons.logo className=''
              width={72}
              height={72}></Icons.logo>
              
            </div>
            <div className="sm:w-1/3 w-4/6 z-20 flex sm:justify-center items-center left-0 shrink">

              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                
                <h2 className="z-10 text-center text-brand hover:text-primary cursor-pointer font-extrabold text-[24px] leading-[30.24px]">
                  TUNEDSPHERE
                </h2>
              </Link>

            </div>
            <div className="sm:w-1/3 w-2/6 shrink-0 relative items-center sm:gap-2 gap-1 flex flex-row justify-end @xs:pr-12 pr-7">
            <SiteCombobox/>
            <CartSheet /> 
              <div  className='hidden @sm:block'>
              <ThemeToggle/>
              </div>
              <div className='flex items-center justify-center'>
              <SignedIn>
               <LoginNavbar/>
               </SignedIn>
               </div>
               
               {/* <MenuBurger handleNavbarToggle={handleNavbarOpen} isOpen={isOpen} setIsOpen={setIsOpen}/> */}
            </div>
          </div>
        </nav>
        <SiteGlobalNavMenuBurger/>
        {/* {isMenuOpen && <NavbarBottom />}
        {isGlobalNavFlyoutOpen && <GlobalNavFlyout/> } */}
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
    </>
  )
}

