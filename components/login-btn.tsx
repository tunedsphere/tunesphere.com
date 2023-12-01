"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons/icons"

interface LogInButtonProps {
  handleModalOpen: () => void
}
const LogInButton: React.FC<LogInButtonProps> = ({ handleModalOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPending, startTransition] = React.useTransition()

  const handleClick = () => {
    setIsModalOpen(!isModalOpen)
    handleModalOpen() // Call the handleToggle prop to toggle NavbarBottom
  }

  return (
    <Button
      variant="logInButton"
      onClick={handleClick}
      className="w-4/5 p-4 text-3xl leading-7 font-semibold"
      disabled={isPending}
    >
      {isPending && (
        <Icons.spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}
      Log In
    </Button>
  )
}

export default LogInButton
