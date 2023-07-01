"use client";
import './globalnavbarapp.css';
import '@styles/globals.css';
import React, { useEffect, useState } from 'react';
import { NavbarBottom, SearchBox, SearchTrigger } from '@components';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { ShoppingCartIcon } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { Button } from '@components/ui/button';
import Modal from '@/components/auth/modal';

const GlobalNav = () => {
  const [isSearchBoxVisible, setSearchBoxVisible] = useState(false);
  const [isNavbarBottomVisible, setNavbarBottomVisible] = useState(true);
  const [currentIcon, setCurrentIcon] = useState('svg/menuburger.svg');
  const [isMenuBurgerVisible, setIsMenuBurgerVisible] = useState(false);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
    setCurrentIcon((prevIcon) =>
      prevIcon === 'svg/menuburger.svg' ? 'svg/x.svg' : 'svg/menuburger.svg'
    );
    setNavbarBottomVisible((prevVisible) => !prevVisible);
  };

  const handleSearchTriggerClick = () => {
    setSearchBoxVisible(!isSearchBoxVisible);
  };

  const closeSearch = () => {
    setSearchBoxVisible(false);
  };
  const closeModal = () => {
    setModalBoxVisible(false);
  };

  return (
    <nav id="globalnav" className="globalnav fixed h-auto">
      <div id="globalnav-content" className="globalnav-content relative ">
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
            <Button
                  
                    variant="ghost"
                    size='xs'>
              <ShoppingCartIcon className="cursor-pointer" />
              </Button>
              <ThemeToggle />
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Button
                    size='xs'
                   onClick={handleModalOpen}
                    variant="ghostline"
                    className="rounded-md text-center text-texthigh px-2 disabled:pointer-events-none ring-offset-background font-bold"
                >Sign In
                </Button>
              </SignedOut>

              {isMenuBurgerVisible && (
                <img
                  src={currentIcon}
                  alt="Menu"
                  className="object-contain cursor-pointer"
                  onClick={handleNavMenuClick}
                />
              )}
            </div>
          </div>
        </nav>
        {isNavbarBottomVisible && <NavbarBottom className="" />}
      </div>

      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0 hidden md:block"
        style={{ zIndex: -10 }}
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>

      {isModalOpen && <Modal onClose={handleModalClose} closeModal={closeModal} />}
    </nav>
  );
};

export default GlobalNav;