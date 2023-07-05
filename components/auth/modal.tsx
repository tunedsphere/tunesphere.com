
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
    
    <div className="md:bg-opacity-80 h-screen z-9999 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
          ref={modalRef}
          className="max-w-[calc(100%-8px)] max-h-[calc(100%-24px)] mx-auto overflow-y-auto no-scrollbar z-10000 fixed bottom-0 top-0 right-2 left-2 my-auto md:top-24 md:bottom-auto">   
        <Shell layout="auth">
          <SigninCard onClose={handleClose} />
        </Shell>
       
        </div>
        
    </div>
 
  );
};

export default Modal;