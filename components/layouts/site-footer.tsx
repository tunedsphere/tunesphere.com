"use client"

import "@/styles/globals.css"

import * as React from "react"
import { useEffect, useRef, useState } from "react"

import Link from "next/link"

import { siteConfig } from "@/configs/site"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function SiteFooter() {
  const [activeIndex, setActiveIndex] = useState(null)
  const containerRef = useRef(null)

  const handleCollapsibleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setActiveIndex(null)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <footer className="relative bottom-0 mx-auto w-full items-center px-4 py-8">
      <div className="footer-gradient -z-10 w-1/5" />

      <div className="gap-5">
        <h3 className="py-8 text-center font-bold text-texthigh md:text-4xl">
          A Psychedelic dedicated Platform
        </h3>
      </div>

      <div className="hidden @container md:block">
        <div className="mx-auto grid max-w-[1400px] py-8 @sm:grid-cols-9">
          <div className="col-start-2">
            <h6 className="py-2 text-left text-texthigh underline decoration-theme-600 underline-offset-4">
              {siteConfig.footerNav[0].title}
            </h6>
            <ul className="text-sm">
              {siteConfig.footerNav[0].items.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
                    <p className="cursor-pointer text-textlow hover:underline">
                      {item.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-start-4">
            <h6 className="py-2 text-left text-texthigh underline decoration-theme-600 underline-offset-4">
              {siteConfig.footerNav[1].title}
            </h6>
            <ul className="text-sm">
              {siteConfig.footerNav[1].items.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
                    <p className="cursor-pointer text-textlow hover:underline">
                      {item.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-start-6">
            <h6 className="py-2 text-left text-texthigh underline decoration-theme-600 underline-offset-4">
              {siteConfig.footerNav[2].title}
            </h6>
            <ul className="text-sm">
              {siteConfig.footerNav[2].items.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
                    <p className="cursor-pointer text-textlow hover:underline">
                      {item.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-start-8">
            <h6 className="py-2 text-left text-texthigh underline decoration-theme-600 underline-offset-4">
              {siteConfig.footerNav[3].title}
            </h6>
            <ul className="text-sm">
              {siteConfig.footerNav[3].items.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>
                    <p className="cursor-pointer text-textlow hover:underline">
                      {item.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="block @container md:hidden" ref={containerRef}>
        <div className="divide-y divide-theme-600">
          {siteConfig.footerNav.map((item, index) => (
            <Collapsible
              key={index}
              open={activeIndex === index}
              onOpenChange={() => handleCollapsibleToggle(index)}
            >
              <CollapsibleTrigger className="w-full py-4 text-texthigh">
                <span className="float-left">{item.title}</span>
                <span className="float-right mr-2">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent className="w-full pb-4 pl-4">
                {item.items.map((subItem, subIndex) => (
                  <Link
                    className="left-0 flex text-textlow hover:underline"
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

      <div className="flex w-full flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        <div className="flex flex-wrap justify-center gap-4">
          <h3 className="text-2xl font-extrabold text-texthigh hover:text-primary">
            TUNEDSPHERE
          </h3>
          <p className="text-sm font-normal text-textlow opacity-75">
            Copyright © 2023 - 2023 TunedSPhere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
