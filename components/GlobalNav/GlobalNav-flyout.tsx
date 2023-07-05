import '@/styles/globals.css';

import * as React from 'react';
import { useState } from 'react';

import { SignedIn, SignedOut } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import NavbarItems from './NavbarItems'; 
import { Button } from '@/components/ui/button';
import { Icons } from "@/components/icons";
import Modal from '@/components/auth/modal';
// Assuming NavbarItems is exported from a separate file
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ThemeToggle } from '@components/theme-toggle';

type GlobalNavFlyoutProps = {
  onClose: () => void;
};

const GlobalNavFlyout: React.FC<GlobalNavFlyoutProps> = ({ onClose }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = React.useTransition()

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };



  const handleCollapsibleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="@container z-9999 bg-background block md:hidden absolute top-0 h-screen w-screen overflow-y-auto no-scrollbar">
     <div className='flex flex-row w-full'>
     <div className='flex row-start py-3 px-4 w-1/2'>
     <ThemeToggle/>
     </div>
     <div className=' items-center gap-2 flex flex-row justify-end py-3 px-4 w-1/2'>
     <Button variant="ghost" onClick={onClose}>
                  <Icons.close
                    className="object-contain text-texthigh cursor-pointer rotate-90 scale-100 transition-all"
                    aria-hidden="true"
                  />
                </Button>
                </div>
                </div>
                
                  <div className='flex justify-center'>
              <SignedOut>
                <Button
                
                  onClick={handleModalOpen}
                  variant="logInButton"
                  className="m-8 p-4 text-3xl leading-7 w-4/5"
        disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
                  Log In<span className="sr-only">Sign In</span>
                </Button>
              </SignedOut>
             
              </div>
  <div className=''>
    <div className="divide-y px-4 justify-between">
      {NavbarItems.map((item, index) => (
        <Collapsible
          key={item.id}
          open={activeIndex === index}
          onOpenChange={() => handleCollapsibleToggle(index)}
        >
          <CollapsibleTrigger className="text-3xl leading-7 flex justify-between text-texthigh w-full py-4">
            <span className="pl-8 flex-start font-semibold">{item.label}</span>
            <span className="mr-5 float-right">
              {activeIndex === index ? "-" : "+"}
            </span>
          </CollapsibleTrigger>
        </Collapsible>
      ))}
    </div>
  </div>
  {isModalOpen && <Modal onClose={handleModalClose} />}
  </div>
  );
};

export default GlobalNavFlyout;