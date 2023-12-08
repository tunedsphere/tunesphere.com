import "./layouts.css";
import React from "react";
import Link from "next/link";

import { Icon } from "@/components/icon";

import { CartSheet } from "@/components/cart/cart-sheet";
import SiteHeaderMenuBurger from "@/components/menuburgers/site-header-menu-burger";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserDropDownMenu } from "../user-dropdown-menu";

interface SiteHeaderProps {}

export function SiteHeader({}: SiteHeaderProps) {
  return (
    <nav
      id="globalnav"
      className="fixed h-auto border-b-2 border-muted/70 @container"
    >
      <div id="globalnav-content" className="relative">
        <nav className="bg-background-navbartop">
          <div className="navbar-container flex h-[--headerHeight] px-4 py-2 md:px-8">
            <div className="relative hidden flex-row items-center justify-start sm:flex sm:w-1/3 sm:gap-2">
              <Icon
                name="logo"
                className="absolute left-0 right-0 z-10 hidden sm:block text-primary w-14 h-14"
              />
            </div>
            <div className="left-0 flex w-4/6 items-center sm:justify-center">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h1 className="cursor-pointer text-center text-lg font-extrabold leading-[24px] text-brand md:text-[24px] md:leading-[30.24px]">
                  TUNEDSPHERE
                </h1>
              </Link>
            </div>
            <div className="relative flex w-2/6 flex-row items-center justify-end sm:pr-11 pr-8 sm:w-1/3 sm:gap-2">
              <CartSheet />
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-center">
                <UserDropDownMenu />
              </div>
            </div>
          </div>
        </nav>
        <SiteHeaderMenuBurger />
      </div>
    </nav>
  );
}
