"use client";
import '@styles/globals.css';
import React, { useState, useRef, useEffect } from 'react';
import SigninCard from '@/components/auth/SigninCard';
import { Shell } from '@components/shells/shell';
import { useDebounce } from "@/hooks/use-debounce"
import { SignedOut } from '@clerk/nextjs';
interface ModalProps {
  handleModalClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ handleModalClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const modalRef = useRef(null)
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)

  const handleClick = () => {
    setIsModalOpen(false);
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleModalClose();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      setQuery("");
    }
  }, [isModalOpen]);

  return (
    <>      
    <SignedOut>
      {isModalOpen && (
        <div className="@container h-screen z-9999 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="overflow-y-auto no-scrollbar w-full no-scrollbar z-10000 absolute @md:top-16 top-0 bottom-0"
          >
            <Shell variant="auth" className='z-40'>
              <SigninCard onClose={handleClick} />
            </Shell>
          </div>
        </div>
      )}
      </SignedOut>
    </>
  );
};

export default Modal;