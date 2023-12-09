"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";

interface MusicSidebarMenuBurgerProps {
  isOpen: boolean;
  handleSidebarToggle: () => void;
  setIsOpen(isOpen: boolean): void;
}
const MusicSidebarMenuBurger: React.FC<MusicSidebarMenuBurgerProps> = ({
  handleSidebarToggle,
  setIsOpen,
  isOpen,
}) => {
  const [rotation, setRotation] = React.useState(0);
  const [scale, setScale] = React.useState(100);

  const handleSidebarClick = () => {
    setIsOpen(!isOpen);
    handleSidebarToggle();
    setRotation(rotation === 0 ? 90 : 0);
    setScale(scale === 100 ? 0 : 100); // Call the handleToggle prop to toggle SidebarBottom
  };

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={handleSidebarClick}
        aria-label="Toggle menu"
        className="text-texthigh hover:text-cyan-500 dark:hover:text-purple-600"
      >
        <Icon
          name="close"
          className={`h-6 w-6 absolute scale-${isOpen ? "100" : "0"}`}
          aria-hidden="true"
        />
        <Icon
          name="menu"
          className={`h-6 w-6 scale-${isOpen ? "0" : "100"}`}
          aria-hidden="true"
        />
      </Button>
    </>
  );
};

export default MusicSidebarMenuBurger;
