"use client"
import './globalnavbarapp.css';
import React, { useState, useEffect } from 'react';
import NavbarItems from './NavbarItems';
import '@styles/globals.css';
import Link from 'next/link';



const NavbarBottom = () => {
  const [isNavbarBottomVisible, setIsNavbarBottomVisible] = useState(true);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);

  useEffect(() => {
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
  // const { param1, param2 } = props;

  return (
<div style={{ display: isNavbarBottomVisible ? 'block' : 'none' }} className="@container">
  <nav className="navbar navbarbottom relative hidden sm:block">
    <div className="flex justify-center navbar-container h-[80px] items-center">
      <ul className="navbar-list items-center">
        {NavbarItems.map((item) => (
         
            <Link href={item.href} className="navbar-item text-texthigh hover:text-colortheme px-3" key={item.id}>
              {item.label}
            </Link>
         
        ))}
      </ul>
    </div>
  </nav>
</div>
  );
}

export default NavbarBottom;