"use client";
import React, { useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface LogInButtonProps {

  handleModalOpen : () => void;
}
const LogInButton: React.FC<LogInButtonProps> = ({ handleModalOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = React.useTransition();

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
    handleModalOpen (); // Call the handleToggle prop to toggle NavbarBottom
  };

  return (
    <Button
      variant='logInButton'
      onClick={handleClick}
      className="m-8 p-4 text-3xl leading-7 w-4/5"
      disabled={isPending}
    >
      {isPending && (
        <Icons.spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}
      Log In<span className="sr-only">Sign In</span>
    </Button>
  );
};

export default LogInButton;