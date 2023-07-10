"use client";
import '@/styles/globals.css';

import * as React from 'react';
import { useState } from 'react';

import { SignedIn, SignedOut } from '@clerk/nextjs';

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
import { UserDropdownMenu } from './user-dropdown-menu';
import { Button } from './ui/button';


const GlobalNavFlyout: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFlyoutOpen, setFlyoutOpen] = useState(true);

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
        <div className="@container z-9999 bg-background block sm:hidden absolute top-0 h-screen w-screen overflow-y-auto no-scrollbar">
          <div className="flex flex-row justify-between w-full">
          <div className="flex py-3 px-4 w-1/2">
          <div className="text-center flex">
  <Button
    size="sm"
    onClick={handleFlyoutMenuClose}
    variant="ghost"
    className=""
  >
    <span className="flex items-center">
      <Icons.chevronLeft className="" />
      <span className="text-lg font-semibold mr-1">Back</span>
    </span>
  </Button>
</div>
            </div>
            <div className="@sm:hidden flex py-3 px-4 w-1/2 justify-end">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex justify-center">
            <SignedOut>
              <LogInButton handleModalOpen={handleModalOpen} />
            </SignedOut>
          </div>

          <div className="">
            <div className="divide-y px-4 justify-between">
              {siteConfig.navbarBottom.map((item, index) => (
                <Collapsible
                  key={item.title}
                  open={activeIndex === index}
                  onOpenChange={() => handleCollapsibleToggle(index)}
                >
                  <CollapsibleTrigger className="text-3xl leading-7 flex justify-between text-texthigh w-full py-4">
                    <span className="pl-8 flex-start font-semibold">
                      {item.label}
                    </span>
                    <span className="mr-5 float-right">
                      {activeIndex === index ? '-' : '+'}
                    </span>
                  </CollapsibleTrigger>
                </Collapsible>
              ))}
            </div>
          </div>
          
        </div>
      )}
      {isModalOpen && <Modal handleModalClose={handleModalOpen} />}
    </>
  );
};

export default GlobalNavFlyout;