"use client"

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import Modal from './auth/modal';

export default function LoginModalButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        variant="outlineTheme"
        className='hidden sm:block shrink-0 font-semibold px-2'
        size="xs" onClick={handleClick}>
        Log In
      </Button>
      {isModalOpen && <Modal handleModalClose={handleModalClose} />}
    </>
  );
}