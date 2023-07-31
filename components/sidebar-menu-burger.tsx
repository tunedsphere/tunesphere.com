"use client";
import React, { useState, useEffect } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface SidebarMenuBurgerProps {
  isOpen: boolean; 
  handleSidebarToggle: () => void;
  setIsOpen(isOpen: boolean): void;
}
const SidebarMenuBurger: React.FC<SidebarMenuBurgerProps> = ({ handleSidebarToggle, setIsOpen, isOpen }) => {

  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(100);

  const handleSidebarClick = () => {
    setIsOpen(!isOpen);
    handleSidebarToggle();
    setRotation(rotation === 0 ? 90 : 0);
    setScale(scale === 100 ? 0 : 100);   // Call the handleToggle prop to toggle SidebarBottom
  };

  return (
    <>
    <Button
      size="sm"
      variant="nav"
      onClick={handleSidebarClick}
      className="text-texthigh hover:text-colortheme"
    >
      <Icons.close
        className={`absolute scale-${isOpen ? '100' : '0'} transition-all`}
        aria-hidden="true"
      />
      <Icons.menu
        className={`scale-${isOpen ? '0' : '100'} transition-all`}
        aria-hidden="true"
      />
    </Button>
    </>
  );
};

export default SidebarMenuBurger;