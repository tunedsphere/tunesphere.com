"use client";
import '@/components/GLobalNav/globalnavbarapp.css';
import '@/styles/globals.css';
import Link from 'next/link';
import React, { useState } from 'react';
import type { User } from "@clerk/nextjs/dist/types/server";

import { ThemeToggle } from '@/components/theme-toggle';
import { NavbarBottom, SearchBox, SearchTrigger } from '@/components';
import GlobalNavFlyout from '@/components/GlobalNav/GlobalNav-flyout';
import { Button } from '@/components/ui/button';
import { Icons } from "@/components/icons"
import Modal from '@/components/auth/modal';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface SiteHeaderProps {
  user: User | null
}

export function SiteHeader({ user }: SiteHeaderProps) {
  const initials = `${user?.firstName?.charAt(0) ?? ""} ${
    user?.lastName?.charAt(0) ?? ""
  }`
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? ""

  const [isSearchBoxVisible, setSearchBoxVisible] = useState(false);
  const [isNavbarBottomOpen, setIsNavbarBottomOpen] = useState(false);
  const [isGlobalNavFlyoutOpen, setIsGlobalNavFlyoutOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuIconVisible, setMenuIconVisible] = useState(true);

  
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

  const handleGlobalNavFlyoutOpen = () => {
    setIsGlobalNavFlyoutOpen(true);
  };



  return (
    <nav id="globalnav" className="globalnav fixed h-auto">
      <div id="globalnav-content" className="globalnav-content relative">
        <nav className="navbar navbartop z-9999 algin-center px-4 md:px-8">
          <div className="py-3 navbar-container flex flex-between justify-between">
            <div className="left-0 w-1/3 items-center flex">
                      
              <SearchTrigger onClick={handleSearchTriggerClick} />
              {isSearchBoxVisible && <SearchBox closeSearch={closeSearch} />}
            </div>
            <div className="w-1/3 flex justify-center items-center">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h2 className="text-center text-brand hover:text-primary algin-center cursor-pointer font-extrabold md:text-[24px] md:leading-[30.24px] text-[20px] leading-[24px]">
                  TUNEDSPHERE
                </h2>
              </Link>
            </div>
            <div className="w-1/3 relative items-center gap-2 flex flex-row justify-end">
              <Button 
              variant="nav"
               size="xs"
              className=' hidden sm:block'>
                <Icons.cart 
                className='transition-all'/>
              </Button>
              <div  className='hidden sm:block'>
              <ThemeToggle/>
              </div>

              {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                      size="xs"
                      variant="nav"
                      className='rounded-full'
                  >
                    <Avatar className='h-8 w-8'>
                      <AvatarImage
                        src={user.imageUrl}
                        alt={user.username ?? ""}
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 z-10000" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs leading-none text-textlow">
                        {email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/account">
                        <Icons.user
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/stores">
                        <Icons.dashboard
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Dashboard

                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild disabled>
                      <Link href="/dashboard/settings">
                        <Icons.settings
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/signout">
                      <Icons.logout
                        className="mr-2 h-4 w-4"
                        aria-hidden="true"
                      />
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (

                <Button
                  size="xs"
                  onClick={handleModalOpen}
                  variant="ghostline"
                  className="transition-all hidden md:block rounded-md text-center text-texthigh px-2 disabled:pointer-events-none ring-offset-background font-bold"
                >
                  Sign In
                </Button>

            )}


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
        {isNavbarBottomOpen && <NavbarBottom />}
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
        <Modal onClose={handleModalClose}/>
      )}
    </nav>
  );
}

