"use client"
import '@/styles/globals.css';
import './globalnavbarapp.css';

import React, { useState} from 'react';
import Link from 'next/link';

import NavbarItems from './NavbarItems';
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const NavbarBottom = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const handleCollapsibleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };



  return (
    <div className="@container">
      <nav className="navbar navbarbottom relative hidden sm:block">
        <div className="flex justify-center navbar-container h-[80px] items-center">
          <ul className="navbar-list items-center divide-y sm:divide-none">
            {NavbarItems.map((item) => (
              <li key={item.id} className="navbar-item px-3">
                <Link href={item.href} className="text-texthigh hover:text-colortheme">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="@container block md:hidden bg-background absolute top-0 left-0 right-0 h-screen">
        <div className="divide-y p-6">
          {NavbarItems.map((item, index) => (
            <Collapsible key={item.id} open={activeIndex === index} onOpenChange={() => handleCollapsibleToggle(index)}>
              <CollapsibleTrigger className="text-texthigh w-full py-4">
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