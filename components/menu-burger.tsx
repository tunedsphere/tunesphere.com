"use client";
import React, { useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface MenuBurgerProps {

  handleToggle: () => void;
}
const MenuBurger: React.FC<MenuBurgerProps> = ({ handleToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    handleToggle(); // Call the handleToggle prop to toggle NavbarBottom
  };

  return (
    <Button
      size="xs"
      variant="nav"
      onClick={handleClick}
      className="text-texthigh hover:text-colortheme object-contain px-2"
    >
      <Icons.close
        className={`absolute rotate-${isOpen ? '0' : '90'} scale-${isOpen ? '100' : '0'} transition-all`}
        aria-hidden="true"
      />
      <Icons.menu
        className={` rotate-${isOpen ? '90' : '0'} scale-${isOpen ? '0' : '100'} transition-all`}
        aria-hidden="true"
      />
    </Button>
  );
};

export default MenuBurger;