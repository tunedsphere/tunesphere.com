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


const GlobalNavFlyout: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(!isModalOpen);
  };

  const handleCollapsibleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className="@container z-9999 bg-background block sm:hidden sticky top-0 h-screen w-screen overflow-y-auto no-scrollbar">
        <div className="flex flex-row w-full">
          <div className="flex row-start py-3 px-4 w-1/2">
            <ThemeToggle />
          </div>
          <div className="items-center gap-2 flex flex-row justify-end py-3 px-4 w-1/2">
          </div>
        </div>

        <div className="flex justify-center">
          <SignedOut>
            <LogInButton handleModalOpen={handleModalOpen}/>
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
        {isModalOpen && <Modal handleModalClose={handleModalOpen}/>}
      </div>

    </>
  );
};

export default GlobalNavFlyout;