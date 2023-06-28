"use client"
import './globalnavbarapp.css';
import React, { useState, useEffect, useRef } from 'react';
import NavbarItems from './NavbarItems';
import '@styles/globals.css';
import Link from 'next/link';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/collapsible";



const NavbarBottom = () => {
  const [isNavbarBottomVisible, setIsNavbarBottomVisible] = useState(true);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);


  const handleCollapsibleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  useEffect(() => {
    if (window.innerWidth <= 640) {
      setIsNavbarBottomVisible(true); // Always show on small devices
      return;
    }

    let lastScrollPosition = window.scrollY;

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > lastScrollPosition) {
        setIsNavbarBottomVisible(false);
        setHasScrolledDown(true);
      } else {
        if (!hasScrolledDown) {
          setIsNavbarBottomVisible(true);
        }
      }

      lastScrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolledDown]);

  return (
<div style={{ display: isNavbarBottomVisible ? 'block' : 'none' }} className="@container">
  <nav className="navbar navbarbottom relative hidden sm:block">
    <div className="flex justify-center navbar-container h-[80px] items-center">
      <ul className="navbar-list items-center divide-y sm:divide-none">
        {NavbarItems.map((item) => (
         
            <Link href={item.href} className="navbar-item text-texthigh hover:text-colortheme px-3" key={item.id}>
              {item.label}
            </Link>
         
        ))}
      </ul>
    </div>
  </nav>
  <div className="@container block md:hidden bg-background absolute top-0 left-0 right-0 h-screen">
    <div className="divide-y p-6">
      {NavbarItems.map((item, index) => (
        <Collapsible key={item.id} open={activeIndex === index} onOpenChange={() => handleCollapsibleToggle(index)}>
          <CollapsibleTrigger className="text-texthigh w-full py-8">
            <span className="items-center">{item.id}</span>
            <span className="mr-2 float-right">{activeIndex === index ? '-' : '+'}</span>
          </CollapsibleTrigger>
        </Collapsible>
      ))}
    </div>
  </div>
</div>
  );
}

export default NavbarBottom;
