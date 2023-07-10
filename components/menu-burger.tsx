"use client";
import React, { useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface MenuBurgerProps {

  handleToggle: () => void;
}
const MenuBurger: React.FC<MenuBurgerProps> = ({ handleToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(100);

  const handleClick = () => {
    setIsOpen(!isOpen);
    handleToggle();
    setRotation(rotation === 0 ? 90 : 0);
    setScale(scale === 100 ? 0 : 100);   // Call the handleToggle prop to toggle NavbarBottom
  };

  return (
    <>
    <Button
      size="xs"
      variant="nav"
      onClick={handleClick}
      className="hidden md:block text-texthigh hover:text-colortheme object-contain px-2"
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
      onClick={handleClick}
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