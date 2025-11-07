import React from 'react';
import '../styles/style.css';

const ImageModal = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <span className="close-modal" onClick={onClose}>&times;</span>
      <img className="modal-content" src={imageSrc} alt="Modal" />
    </div>
  );
};

export default ImageModal;

