import "./layouts.css"
import React from "react"
import Link from "next/link"
import type { User } from "@clerk/nextjs/server"

import SiteGlobalNavMenuBurger from "@/components/menuburgers/site-global-nav-menu-burger"
import { SiteCombobox } from "@/components/site-combobox"

import { CartSheet } from "@/components/cart/cart-sheet"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"

import NavbarVideo from "../navbar-video"
import IndexLoginNavbar from "../index-login-navbar"
import { Button, buttonVariants } from "@/components/ui/button"
import IndexLoginModalButton from "../index-login-modal-btn"



import { getUserEmail } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


 interface SiteGlobalNavProps {
  user: User | null
}

export function SiteGlobalNav({ user }: SiteGlobalNavProps) {
    const initials = `${user?.firstName?.charAt(0) ?? ""} ${
      user?.lastName?.charAt(0) ?? ""
    }`
    const email = getUserEmail(user)


  return (
    <>
      <nav
        id="globalnav"
        className="globalnav fixed h-auto border-b-2 border-accent-2 @container">
        <div
          id="globalnav-content"
          className="relative bg-background-globalnav md:bg-background-globalnav/50">
          <div className="navbar-container flex h-[--headerHeight] px-4 py-2 md:px-8">
            <div className="relative hidden flex-row items-center justify-start gap-1 sm:flex sm:w-1/3 sm:gap-2">
              <Icons.logo 
              className="z-100 text-primary"
              width={54}
              height={54}></Icons.logo>
            </div>
            <div className="left-0 z-20 flex w-4/6 shrink items-center sm:w-1/3 sm:justify-center">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h2 className="z-10 cursor-pointer text-center text-[24px] font-extrabold leading-[30.24px] text-indexhigh">
                  TUNEDSPHERE
                </h2>
              </Link>
            </div>
            <div className="relative flex w-2/6 shrink-0 flex-row items-center justify-end gap-1 sm:pr-11 pr-8 sm:w-1/3 sm:gap-2">
              <SiteCombobox className="hover:text-white" />
              <CartSheet className="hover:text-white"/>
              <div className="hidden @sm:block">
                <ThemeToggle className="hover:text-white"/>
              </div>
              <div className="flex items-center justify-center">
                {user ? (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="xs" variant="nav" className="hover:bg-transparent">
                    <Avatar className="flex h-7 w-7 items-center justify-center shadow-sm shadow-slate-900/50">
                      <AvatarImage src={user.imageUrl} alt={user.username ?? ""} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="z-10000 w-56 border-theme p-2 bg-background"
                  align="center"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="py-1 text-base font-medium leading-none">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs leading-none text-textlow">{email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/account">
                        <Icons.user className="mr-2 h-4 w-4" aria-hidden="true" />
                        Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/stores">
                        <Icons.dashboard
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild disabled>
                      <Link href="/dashboard/settings">
                        <Icons.settings className="mr-2 h-4 w-4" aria-hidden="true" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/signout">
                      <Icons.logout className="mr-2 h-4 w-4" aria-hidden="true" />
                      Log out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <IndexLoginModalButton />
            )}
              </div>
            </div>
          </div>
          <SiteGlobalNavMenuBurger />
        </div>
        <NavbarVideo/>
      </nav>
    </>
  )
}
