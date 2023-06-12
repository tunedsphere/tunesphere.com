"use client";
import { useState, useRef, useEffect } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/collapsible";
import { footerConfig } from '@configs/footer';

import '@styles/globals.css';
import Link from "next/link";


const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);

  const handleCollapsibleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setActiveIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const { footerNav } = footerConfig;
  return (
  <footer
      className="bottom-0 relative items-center px-4 md:px-8  py-8 mx-auto" 
  >
    <div className="footer-gradient w-2/5" />
      <div className="gap-5">
        <h3 className="text-center font-bold py-8 text-high md:text-4xl" >
          A Psychedelic dedicated Platform
        </h3>

      </div>

      <div className='@container hidden md:block'>
  <div className="grid @sm:grid-cols-9 mx-auto max-w-[1400px] py-8">
    <div className="col-start-2">
      <h6 className='text-texthigh text-left underline underline-offset-4 decoration-colortheme py-2'>{footerNav[0].title}</h6>
      <ul className='text-sm'>
        {footerNav[0].items.map((subItem) => (
          <li key={subItem.title}>
            <a className="text-textlow cursor-pointer hover:underline">{subItem.title}</a>
          </li>
        ))}
      </ul>
    </div>
    <div className="col-start-4">
      <h6 className='text-texthigh text-left underline underline-offset-4 decoration-colortheme py-2'>{footerNav[1].title}</h6>
      <ul className='text-sm'>
        {footerNav[1].items.map((subItem) => (
          <li key={subItem.title}>
            <a className="text-textlow cursor-pointer hover:underline">{subItem.title}</a>
          </li>
        ))}
      </ul>
    </div>
    <div className="col-start-6">
      <h6 className='text-texthigh text-left underline underline-offset-4 decoration-colortheme py-2'>{footerNav[2].title}</h6>
      <ul className='text-sm'>
        {footerNav[2].items.map((subItem) => (
          <li key={subItem.title}>
            <a className="text-textlow cursor-pointer hover:underline">{subItem.title}</a>
          </li>
        ))}
      </ul>
    </div>
    <div className="col-start-8">
      <h6 className='text-texthigh text-left underline underline-offset-4 decoration-colortheme py-2'>{footerNav[3].title}</h6>
      <ul className='text-sm'>
        {footerNav[3].items.map((subItem) => (
          <li key={subItem.title}>
            <a className="text-textlow cursor-pointer hover:underline">{subItem.title}</a>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

<div className='@container block md:hidden' ref={containerRef}>
      <div className="divide-y">
        {footerNav.map((item, index) => (
          <Collapsible key={item.title} open={activeIndex === index} onOpenChange={() => handleCollapsibleToggle(index)}>
            <CollapsibleTrigger className="text-texthigh w-full py-4">
              <span className="float-left">{item.title}</span>
              <span className="mr-2 float-right">{activeIndex === index ? '-' : '+'}</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="pb-4 pl-6 w-full">
              {item.items.map((subItem) => (
                <a
                  className="flex left-0 text-textlow hover:underline"
                  key={subItem.title}
                  href={subItem.href}
                >
                  {subItem.title}
                </a>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
 

      
      <div className="flex flex-col w-full">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        <div className="flex flex-wrap gap-4 justify-center">
          <h3 className="font-extrabold text-2xl text-texthigh hover:text-primary">
            TUNEDSPHERE
          </h3>
          <p className="text-sm font-normal text-textlow opacity-75">
            Copyright © 2023 - 2023 TunedSPhere. All rights reserved.
          </p>

        </div>
      </div>
  </footer>
  );
};

export default Footer;
