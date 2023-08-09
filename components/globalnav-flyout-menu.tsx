"use client"

import "@/styles/globals.css"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import { ThemeToggle } from "@components/theme-toggle"

import { siteConfig } from "@/configs/site"
// Assuming NavbarItems is exported from a separate file
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible"
import Modal from "@/components/auth/modal"
import { Icons } from "@/components/icons"
import LogInButton from "@/components/login-btn"

import { Button } from "./ui/button"

const GlobalNavFlyout: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isFlyoutOpen, setFlyoutOpen] = useState(true)
  const { user, isSignedIn } = useUser()

  const UserProfileImage = () => {
    if (!user) return null
    return (
      <div className="flex items-center justify-center ">
        <img
          src={user.profileImageUrl}
          className="my-6 h-20 w-20 flex-none rounded-full border-4 border-white"
          alt="Profile image"
        />
      </div>
    )
  }

  const handleModalOpen = () => {
    setModalOpen(!isModalOpen)
  }

  const handleCollapsibleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  const handleFlyoutMenuClose = () => {
    setFlyoutOpen(false)
  }

  return (
    <>
      {isFlyoutOpen && (
        <div className="no-scrollbar absolute top-0 z-9999 block h-screen w-screen overflow-y-auto bg-background px-1 @container sm:hidden">
          <div className="flex w-full flex-1 flex-row justify-between">
            <div className="flex w-1/4 py-3">
              <Button
                size="sm"
                onClick={handleFlyoutMenuClose}
                variant="ghost"
                className="mx-0 px-0"
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
                <UserProfileImage></UserProfileImage>
              </div>
            </SignedIn>
          </div>

          <div className="justify-between divide-y divide-theme px-4  pb-8">
            {siteConfig.navbarNav.map((item) => (
              <li
                key={item.title}
                className="flex w-full justify-between py-4 text-2xl leading-7 text-texthigh"
              >
                <Link
                  href={item.href}
                  className="text-texthigh hover:text-theme"
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

export default GlobalNavFlyout
