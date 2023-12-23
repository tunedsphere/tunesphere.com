'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import { Modal } from '@/components/auth/modal'

export default function LoginModalButton() {
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
        id="login-modal-btn"
        onClick={handleClick}
        className="hidden shrink-0 border-2 border-primary bg-transparent font-semibold leading-6 hover:bg-primary/30 sm:block"
      >
        Log In
      </Button>
      {isModalOpen && <Modal handleModalClose={handleModalClose} />}
    </>
  )
}
