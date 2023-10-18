"use client"

import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import { ThemeToggle } from "@/components/theme-toggle"

import { siteConfig } from "@/configs/site"

import Modal from "@/components/auth/modal"
import { Icons } from "@/components/icons"
import LogInButton from "@/components/login-btn"

import { Button } from "../ui/button"


interface GlobalNavFlyoutProps {
  handleClose: () => void
}
  export default function GlobalNavFlyout({ handleClose }: GlobalNavFlyoutProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isFlyoutOpen, setFlyoutOpen] = useState(true)
  const { user, isSignedIn } = useUser()

  const UserProfileImage = () => {
    if (!user) return null
    return (
      <div className="flex items-center justify-center ">
        <img
          onClick={handleClose}
         width={60}
         height={60}
          src={user.imageUrl}
          className="h-32 w-32 flex-none rounded-full border border-muted/30 shadow-sm"
          alt="Profile image"
        />
      </div>
    )
  }

  const handleModalOpen = () => {
    setModalOpen(!isModalOpen)
  }

  return (
    <>
      {isFlyoutOpen && (
        <div className="no-scrollbar absolute top-0 z-9999 block h-screen w-screen overflow-y-auto bg-background px-2 @container sm:hidden space-y-4">
          <div className="flex w-full flex-1 flex-row justify-between">
            <div className="flex w-1/4 py-3">
              <Button
                size="sm"
                onClick={handleClose}
                variant="ghost"
                className="mx-0 px-0 hover:bg-muted/30 hover:text-primary"
              >
                <span className="flex items-center">
                  <Icons.chevronLeft className="" />
                  <span className="pr-2 text-lg font-semibold">Back</span>
                </span>
              </Button>
            </div>
            <div className="flex w-1/2 justify-end py-3 @sm:hidden">
              <ThemeToggle />
            </div>
          </div>
          <div className="flex justify-center">
            <SignedOut>
              <LogInButton handleModalOpen={handleModalOpen} />
            </SignedOut>
            <SignedIn>
              <div className="flex flex-col items-center p-2">
                <Link href="/dashboard/account" className="cursor-pointer">
                <UserProfileImage ></UserProfileImage>
              </Link>
              </div>
            </SignedIn>
          </div>

          <div className="justify-between divide-y divide-theme px-2 pb-8">
          {siteConfig.navbarNav.map((item) => (
  <li
    key={item.title}
    className="flex w-full justify-between py-4 text-2xl leading-7 text-texthigh"
  >
    <Link
      onClick={handleClose}
      href={item.href}
      className={cn(
        "text-texthigh hover:text-texthigh/70",
        item.disabled && "cursor-not-allowed opacity-80"
      )}
    >
      {item.label}
    </Link>
  </li>
))}
          </div>
        </div>
      )}
      {isModalOpen && <Modal handleModalClose={handleModalOpen} />}
    </>
  )
}
