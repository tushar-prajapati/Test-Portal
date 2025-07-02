import React, { useState, useRef, useEffect } from 'react';
import { RxCross1 } from "react-icons/rx";

const OverlayModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-3"
      >
        <div className='h-6 w-full flex justify-end'><RxCross1
        onClick={onClose}
        className='cursor-pointer text-lg'/></div>
        <div className='w-full h-full '>


        {children}


        </div>
      </div>
    </div>
  );
}

export default OverlayModal;

