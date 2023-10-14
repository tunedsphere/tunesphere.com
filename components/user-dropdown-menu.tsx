import "@/styles/globals.css"

import React from "react"
import Link from "next/link"
import type { User } from "@clerk/nextjs/dist/types/server"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"

import LoginModalButton from "./login-modal-btn"
import { Button } from "./ui/button"

interface UserDropdownMenuProps {
  user: User | null
}

export function UserDropdownMenu({ user }: UserDropdownMenuProps) {
  const initials = `${user?.firstName?.charAt(0) ?? ""} ${
    user?.lastName?.charAt(0) ?? ""
  }`
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? ""
  return (
    <>
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
            className="z-10000 w-56 border-theme p-2"
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
    </>
  )
}
