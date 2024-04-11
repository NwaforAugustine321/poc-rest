// Modal.tsx

import React, { useEffect } from 'react';

interface ModalProps {
  children?: React.ReactNode;
  content?: string;
  onClose: () => void;
  showModal: boolean;
}

const NotificationModal: React.FC<ModalProps> = ({
  children,
  content,
  onClose,
  showModal,
}) => {
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        onClose(); // Close modal after 5000ms
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [onClose, showModal]);

  const closeModal = () => {
    onClose(); // Close modal manually
  };

  if (!showModal) {
    return null;
  }
  console.log(showModal, 'show');
  return (
    <div className='modal bg-green-500 absolute w-[400px] top-0 right-0 h-[300px]'>
      <div className='modal-content'>
        <span className='close' onClick={closeModal}>
          &times;
        </span>
        {children || content}
        <button className='text-black bg-green-500' onClick={closeModal}>
          Close
        </button>{' '}
        {/* Manual close button */}
      </div>
    </div>
  );
};

export default NotificationModal;
