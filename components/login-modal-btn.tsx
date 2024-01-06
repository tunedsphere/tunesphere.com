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
        variant="primary"
        id="login-modal-btn"
        onClick={handleClick}
        className="hidden shrink-0 font-semibold leading-6 sm:block"
      >
        Log In
      </Button>
      {isModalOpen && <Modal handleModalClose={handleModalClose} />}
    </>
  )
}
