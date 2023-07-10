"use client";
import '@styles/globals.css';
import React, { useState, useRef, useEffect } from 'react';
import SigninCard from '@/components/auth/SigninCard';
import { Shell } from '@/components/shell';
interface ModalProps {
  handleModalClose: () => void;
}
const Modal: React.FC<ModalProps> = ({ handleModalClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const modalRef = useRef(null);

  const handleClick = () => {
    setIsModalOpen(false);
  };

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      handleModalClose();
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
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

  return (
    <>
      {isModalOpen && (
        <div className="@container h-screen z-9999 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="overflow-y-auto no-scrollbar w-full no-scrollbar z-10000 absolute @xs:mt-[var(--headerHeight)] @4xl:top-16 top-0 bottom-0"
          >
            <Shell layout="auth">
              <SigninCard onClose={handleClick} />
            </Shell>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;