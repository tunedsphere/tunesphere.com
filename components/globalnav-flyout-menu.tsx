"use client";
import '@/styles/globals.css';

import * as React from 'react';
import { useState } from 'react';

import { SignedIn, SignedOut } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';

import { siteConfig } from "@/configs/site";
import LogInButton from '@/components/login-btn';
import { Icons } from "@/components/icons";
import Modal from '@/components/auth/modal';
// Assuming NavbarItems is exported from a separate file
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ThemeToggle } from '@components/theme-toggle';

import { Button } from './ui/button';
import Link from 'next/link';

const GlobalNavFlyout: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFlyoutOpen, setFlyoutOpen] = useState(true);
  const {user,isSignedIn} = useUser();

  const UserProfileImage = () => {
 
    if (!user) return null;
    return (
      <div className='flex justify-center items-center '>
    
      <img 
      src={user.profileImageUrl}
      className='my-6 flex-none h-20 w-20 border-4 border-white rounded-full' alt="Profile image" />
  
    </div>
    );
};

  const handleModalOpen = () => {
    setModalOpen(!isModalOpen);
  };

  const handleCollapsibleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleFlyoutMenuClose = () => {
    setFlyoutOpen(false);
  };

  return (
    <>
      {isFlyoutOpen && (
        <div className="@container z-9999 bg-background block sm:hidden absolute top-0 h-screen w-screen overflow-y-auto no-scrollbar px-1">
          <div className="flex flex-1 flex-row justify-between w-full">
          <div className="flex py-3 w-1/4">
  <Button
    size="sm"
    onClick={handleFlyoutMenuClose}
    variant="ghost"
    className="px-0 mx-0"
  >
    <span className="flex items-center">
      <Icons.chevronLeft className="" />
      <span className="text-lg font-semibold pr-2">Back</span>
    </span>
  </Button>

            </div>
     
            <div className="@sm:hidden flex py-3 w-1/2 justify-end">
              <ThemeToggle />
            </div>
          </div>
        

          <div className="flex justify-center py-6">
            <SignedOut>
              <LogInButton handleModalOpen={handleModalOpen} />
              
            </SignedOut>
            <SignedIn>
            <div className='flex flex-col items-center p-2'>
              <UserProfileImage></UserProfileImage>
            </div>
            </SignedIn>  
          </div>

            <div className="divide-y px-4 justify-between divide-colortheme pb-8">
      {siteConfig.navbarNav.map((item) => (
          <li key={item.title} className="text-2xl leading-7 flex justify-between text-texthigh w-full py-4">
            <Link
              href={item.href}
              className="text-texthigh hover:text-colortheme"
            >
              {item.label}
            </Link>
          </li>
        ))}
            </div>
          </div>
      )}
      {isModalOpen && <Modal handleModalClose={handleModalOpen} />}
    </>
  );
};

export default GlobalNavFlyout;