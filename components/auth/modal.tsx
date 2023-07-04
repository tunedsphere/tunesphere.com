
import '@styles/globals.css';
import React, { useRef, useEffect} from 'react';

import SigninCard from '@/components/auth/SigninCard';
import { Shell } from "@/components/shell";


const Modal = ({ onClose }) => {
  const modalRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
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
    
    <div className="fixed inset-0 z-9999 bg-black md:bg-opacity-80 h-screen md:right-0 md:left-0 right-2 left-2 top-2">
      <div
          ref={modalRef}
          className="relative flex justify-center">  

        <Shell layout="auth">
          <SigninCard onClose={handleClose} />
        </Shell>
      
        </div>
    </div>
 
  );
};

export default Modal;