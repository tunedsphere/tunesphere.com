'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/icon'

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
      variant="rounded"
      onClick={handleClick}
      className="w-4/5 p-4 text-3xl font-semibold leading-7"
      disabled={isPending}
    >
      {isPending && (
        <Icon
          name="spinner"
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}
      Log In
    </Button>
  )
}

export default LogInButton
