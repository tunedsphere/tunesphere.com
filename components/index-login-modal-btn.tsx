'use client'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import Modal from '@/components/auth/modal'

export default function IndexLoginModalButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Button
        id="index-login-modal-btn"
        className="border-themefont-semibold hidden rounded-md border-2 border-primary p-0 px-2 text-white hover:bg-primary/30  hover:text-white/70 sm:block"
        variant="nav"
        onClick={handleClick}
      >
        <span className="h-6 w-6 items-center">Log In</span>
      </Button>
      {isModalOpen && <Modal handleModalClose={handleModalClose} />}
    </>
  )
}
