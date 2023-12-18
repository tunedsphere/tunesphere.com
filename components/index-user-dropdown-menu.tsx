import { currentUser } from '@clerk/nextjs'

import React from 'react'
import Link from 'next/link'
import { getUserEmail } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/icon'

import IndexLoginModalButton from '@/components/index-login-modal-btn'
export async function IndexUserDropdownMenu() {
  const user = await currentUser()
  const initials = `${user?.firstName?.charAt(0) ?? ''} ${
    user?.lastName?.charAt(0) ?? ''
  }`
  const email = getUserEmail(user)
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-6 w-6 cursor-pointer items-center justify-center shadow-sm shadow-slate-900/50">
              <AvatarImage
                role="img"
                src={user.imageUrl}
                alt={user.username ?? ''}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="z-10000 w-56 border-theme bg-background p-2"
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
                  <Icon
                    name="user"
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/stores">
                  <Icon
                    name="dashboard"
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild disabled>
                <Link href="/dashboard/settings">
                  <Icon
                    name="gear"
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/signout">
                <Icon
                  name="logout"
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <IndexLoginModalButton />
      )}
    </>
  )
}
