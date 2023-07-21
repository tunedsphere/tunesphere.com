"use client";
import React, { useState, useEffect } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface MenuBurgerProps {
  isOpen: boolean; 
  handleNavbarToggle: () => void;
  setIsOpen(isOpen: boolean): void;
}
const MenuBurger: React.FC<MenuBurgerProps> = ({ handleNavbarToggle, setIsOpen, isOpen }) => {

  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(100);

  const handleNavbarClick = () => {
    setIsOpen(!isOpen);
    handleNavbarToggle();
    setRotation(rotation === 0 ? 90 : 0);
    setScale(scale === 100 ? 0 : 100);   // Call the handleToggle prop to toggle NavbarBottom
  };
  
  // useEffect(() => {
  //   let prevScrollPos = window.pageYOffset;

  //   const handleScroll = () => {
  //     const currentScrollPos = window.pageYOffset;

  //     // Check if the current scroll position is at the top of the page (within a small threshold)
  //     const isAtTop = currentScrollPos < 20;

  //     // Only update the menu state if the scroll position is at the top of the page
  //     if (isAtTop) {
  //       setIsOpen(false);
  //     } else {
  //       // Scrolling down, close the menu
  //       setIsOpen(true);
  //     }

  //     prevScrollPos = currentScrollPos;
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <>
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
        className={` rotate-${isOpen ? '90' : '0'} scale-${isOpen ? '0' : '100'} transition-all`}
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
    </>
  );
};

export default MenuBurger;