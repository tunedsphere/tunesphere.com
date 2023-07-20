"use client";
import '@styles/globals.css';
import * as React from "react";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import stars6 from '@/public/bghome/stars6.png';

import { siteConfig } from "@/configs/site";


export function SiteFooter() {
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


  return (
    <footer className="bottom-0 relative items-center mx-auto py-8 px-4">
      <Image
        src={stars6}
        priority
        placeholder="blur"
        width={500}
        height={500}
        alt="Footer Stars"
        className="-z-10 absolute right-0 bottom-0 w-1/2 lg:w-1/4 object-contain opacity-80"
      />

      <div className="footer-gradient w-1/5 -z-10" />
      
      <div className="gap-5">
        <h3 className="text-center font-bold py-8 text-high md:text-4xl">
          A Psychedelic dedicated Platform
        </h3>
      </div>

      <div className="@container hidden md:block">
        <div className="grid @sm:grid-cols-9 mx-auto max-w-[1400px] py-8">
        <div className="col-start-2">
        <h6 className="text-texthigh text-left underline underline-offset-4 decoration-colortheme py-2">
              {siteConfig.footerNav[0].title}
            </h6>
        <ul className="text-sm">
        {siteConfig.footerNav[0].items.map((item, index) => (
   <li key={index}>
   <Link href={item.href}>
     <p className="text-textlow cursor-pointer hover:underline">
       {item.title}
     </p>
   </Link>
 </li>
  ))}
  </ul>
</div>
          <div className="col-start-4">
          <h6 className="text-texthigh text-left underline underline-offset-4 decoration-colortheme py-2">
              {siteConfig.footerNav[1].title}
            </h6>
        <ul className="text-sm">
        {siteConfig.footerNav[1].items.map((item, index) => (
   <li key={index}>
   <Link href={item.href}>
     <p className="text-textlow cursor-pointer hover:underline">
       {item.title}
     </p>
   </Link>
 </li>
  ))}
  </ul>
          </div>
          <div className="col-start-6">
          <h6 className="text-texthigh text-left underline underline-offset-4 decoration-colortheme py-2">
              {siteConfig.footerNav[2].title}
            </h6>
        <ul className="text-sm">
        {siteConfig.footerNav[2].items.map((item, index) => (
   <li key={index}>
   <Link href={item.href}>
     <p className="text-textlow cursor-pointer hover:underline">
       {item.title}
     </p>
   </Link>
 </li>
  ))}
  </ul>
          </div>
          <div className="col-start-8">
          <h6 className="text-texthigh text-left underline underline-offset-4 decoration-colortheme py-2">
              {siteConfig.footerNav[3].title}
            </h6>
        <ul className="text-sm">
        {siteConfig.footerNav[3].items.map((item, index) => (
   <li key={index}>
   <Link href={item.href}>
     <p className="text-textlow cursor-pointer hover:underline">
       {item.title}
     </p>
   </Link>
 </li>
  ))}
  </ul>
          </div>
        </div>
      </div>

      <div className="@container block md:hidden" ref={containerRef}>
        <div className="divide-y divide-colortheme">
          {siteConfig.footerNav.map((item, index) => (
            <Collapsible key={index} open={activeIndex === index} onOpenChange={() => handleCollapsibleToggle(index)}>
              <CollapsibleTrigger className="text-texthigh w-full py-4">
                <span className="float-left">{item.title}</span>
                <span className="mr-2 float-right">{activeIndex === index ? '-' : '+'}</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="pb-4 pl-4 w-full">
                {item.items.map((subItem, subIndex) => (
                  <Link
                    className="flex left-0 text-textlow hover:underline"
                    key={subIndex}
                    href={subItem.href}
                  >
                    {subItem.title}
                  </Link>
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
}

export default SiteFooter;