"use client";
import React, { useState, useEffect } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import GlobalNavFlyout from '@/components/globalnav-flyout-menu';
import { NavbarBottom } from '@components/layouts/navbar-bottom';

export default function SiteGlobalNavMenuBurger() {
  const [isMenuOpen, setMenuOpen] = useState(true);

  const [isGlobalNavFlyoutOpen, setGlobalNavFlyoutOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 


  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(100);

  const handleNavbarClick = () => {
    setGlobalNavFlyoutOpen(!isGlobalNavFlyoutOpen);
    setMenuOpen(!isMenuOpen);
    setIsOpen(!isOpen);
    setRotation(rotation === 0 ? 90 : 0);
    setScale(scale === 100 ? 0 : 100);   // Call the handleToggle prop to toggle NavbarBottom
  };

  return (
    <>  
        <div  className="fixed invisible top-0 left-0 right-0 z-20 bg-white py-2 navbar-container h-[--headerHeight] flex justify-end items-center md:px-8 @sm:px-4 px-2">
          <div className="-z-20000 visible">
             <Button
size="xs"
variant="nav"
onClick={handleNavbarClick}
className="hidden md:block text-texthigh hover:text-colortheme"
>
<Icons.menu
  className={`absolute rotate-${isOpen ? '0' : '90'} scale-${isOpen ? '100' : '0'} transition-all`}
  aria-hidden="true"
/>
<Icons.close
  className={`rotate-${isOpen ? '90' : '0'} scale-${isOpen ? '0' : '100'} transition-all`}
  aria-hidden="true"
/>
</Button>
<Button
size="xs"
variant="nav"
onClick={handleNavbarClick}
className="block md:hidden text-texthigh hover:text-colortheme object-contain px-2"
>
<Icons.menu
 className={`rotate-${rotation}scale -${isOpen ? '0' : '100'} transition-all`}
    aria-hidden="true"
/>
</Button>
             {/* <MenuBurger handleNavbarToggle={handleNavbarOpen} isOpen={isOpen} setIsOpen={setIsOpen}/> */}
          </div>
        </div>

    {isMenuOpen && <NavbarBottom />}
    {isGlobalNavFlyoutOpen && <GlobalNavFlyout/> }

    </>
  );
};

