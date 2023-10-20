
import "@/styles/globals.css"

import React from "react"
import Link from "next/link"
import type { User } from "@clerk/nextjs/server"
import { Icons } from "@/components/icons"


import { Button, buttonVariants } from "@/components/ui/button"
import LoginModalButton from "../login-modal-btn"
import { CartSheet } from "@/components/cart/cart-sheet"
import SiteHeaderMenuBurger from "@/components/menuburgers/site-header-menu-burger"
import { ThemeToggle } from "@/components/theme-toggle"

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


interface SiteHeaderProps {
  user: User | null
}

export function SiteHeader({ user }: SiteHeaderProps) {
  const initials = `${user?.firstName?.charAt(0) ?? ""} ${
    user?.lastName?.charAt(0) ?? ""
  }`
  const email = getUserEmail(user)
  // // Rest of the code...
  // const [isMenuOpen, setMenuOpen] = useState(false);
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [isGlobalNavFlyoutOpen, setGloisGlobalNavFlyoutOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(true);
  // const [isCartSheetOpen, setCartSheetOpen] = useState(false);

  // const handleNavbarOpen = () => {
  //   setGloisGlobalNavFlyoutOpen(!isGlobalNavFlyoutOpen);
  //   setMenuOpen(!isMenuOpen);
  // };
  // const handleModalOpen = () => {
  //   setModalOpen(!isModalOpen);
  // };
  // const handleToggleCartSheet = () => {
  //   setCartSheetOpen(!isCartSheetOpen);
  // };

  return (
    <nav
      id="globalnav"
      className="globalnav fixed h-auto border-b-2 border-accent-2 @container z-9999"
    >
      <div id="globalnav-content" className="relative">
        <nav className="z-9999 bg-background-navbartop">
          <div className="navbar-container flex h-[--headerHeight] px-4 py-2 md:px-8">
            <div className="relative hidden flex-row items-center justify-start sm:flex sm:w-1/3 sm:gap-2">
              <Icons.logo
                className="absolute left-0 right-0 z-10 hidden sm:block text-primary"
                width={54}
              height={54}
              ></Icons.logo>
            </div>
            <div className="left-0 flex w-4/6 items-center sm:justify-center">
              <Link href="/" aria-label="tunedsphere" id="tunedsphere">
                <h2 className="cursor-pointer text-center text-[20px] font-extrabold leading-[24px] text-brand md:text-[24px] md:leading-[30.24px]">
                  TUNEDSPHERE
                </h2>
              </Link>
            </div>
            <div className="relative flex w-2/6 flex-row items-center justify-end sm:pr-11 pr-8 sm:w-1/3 sm:gap-2">
              <CartSheet className=""/>
              <div className="hidden sm:block">
                <ThemeToggle className=""/>
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
              <LoginModalButton />
            )}
              </div>
            </div>
          </div>
        </nav>
        <SiteHeaderMenuBurger />
      </div>
    </nav>
  )
}
