"use client";
import './globalnavbarapp.css';
import '@styles/globals.css';
import React, { useEffect, useState } from 'react';
import { NavbarBottom, SearchBox, SearchTrigger } from '@components';
import { SignedIn, SignedOut} from '@clerk/nextjs';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';


const GlobalNav = () => {
  const [isSearchBoxVisible, setSearchBoxVisible] = useState(false);
  const [isNavbarBottomVisible, setNavbarBottomVisible] = useState(true);
  const [currentIcon, setCurrentIcon] = useState('svg/menuburger.svg');
  const [isMenuBurgerVisible, setIsMenuBurgerVisible] = useState(false);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);


  
  useEffect(() => {
    if (window.innerWidth >= 768) {
      let lastScrollPosition = window.scrollY;

      const handleScroll = () => {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition > lastScrollPosition) {
          setIsMenuBurgerVisible(true);
          setHasScrolledDown(true);
          setNavbarBottomVisible(false);
        } else {
          if (!hasScrolledDown) {
            setIsMenuBurgerVisible(true);
            setNavbarBottomVisible(true);
          }
        }

        lastScrollPosition = currentScrollPosition;
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      setIsMenuBurgerVisible(true);
    }
  }, [hasScrolledDown]);

  const handleNavMenuClick = () => {
    setCurrentIcon(prevIcon => prevIcon === 'svg/menuburger.svg' ? 'svg/x.svg' : 'svg/menuburger.svg');
    setNavbarBottomVisible(prevVisible => !prevVisible);
  };
  const handleSearchTriggerClick = () => {
    setSearchBoxVisible(!isSearchBoxVisible);
  };

  const closeSearch = () => {
    setSearchBoxVisible(false);
  };




  return (
    <nav id="globalnav" className="globalnav fixed h-auto">
      <div id="globalnav-content" className="globalnav-content relative">
        <nav className="navbar navbartop z-9999 algin-center px-4 md:px-8">
          <div className="py-3 navbar-container flex flex-between justify-between">
            <div className='left-0 w-1/3 items-center flex'>
              <SearchTrigger className="" onClick={handleSearchTriggerClick} />
              {isSearchBoxVisible && <SearchBox closeSearch={closeSearch} />}
            </div>
            <div
              className="w-1/3 flex justify-center"
            >
             
             <Link href="/" aria-label='tunedsphere'id='tunedsphere'>
  <h2 className="text-center text-brand hover:text-primary algin-center cursor-pointer font-extrabold text-[24px] leading-[30.24px]">
    TUNEDSPHERE
  </h2>
</Link>

            </div>
            <div className='w-1/3 relative items-center right-0 flex flex-row-reverse gap-2'>
              {isMenuBurgerVisible && (
                <img
                  src={currentIcon}
                  alt="Menu"
                  className="object-contain cursor-pointer"
                  onClick={handleNavMenuClick}
                />
              )}
          
            <SignedIn>
              <UserButton/>
            </SignedIn>
       
              <SignedOut>
            
                <SignInButton mode='modal' 

              className="hidden @2xl:block rounded-md px-2 font-medium disabled:pointer-events-none ring-offset-background outline-cyan-500/50 outline outline-1 hover:outline-offset-1 text-transparent bg-clip-text bg-gradient-to-r to-colortheme from-sky-400"></SignInButton>
           
              </SignedOut>
                
            <ShoppingCartIcon className='cursor-pointer'/>

            </div>
          </div>
        </nav>
        {isNavbarBottomVisible && <NavbarBottom className=""></NavbarBottom>}
      </div>

      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0 hidden md:block"
        style={{ zIndex: -10 }}
      >
        <source src='/bgvideo.mp4' type="video/mp4" />
      </video>
    </nav>
  );
};

export default GlobalNav;