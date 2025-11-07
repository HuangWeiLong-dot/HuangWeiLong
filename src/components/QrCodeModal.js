import React from 'react';
import '../styles/style.css';

const QrCodeModal = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const getQrCodeData = () => {
    if (type === 'qq') {
      return {
        title: 'QQ QR Code',
        image: '/images/QQ.jpg',
        description: 'QQ: 3571676852'
      };
    } else if (type === 'wechat') {
      return {
        title: 'WeChat QR Code',
        image: '/images/WeChat.jpg',
        description: 'Scan the QR code to add me on WeChat'
      };
    }
    return { title: '', image: '', description: '' };
  };

  const qrData = getQrCodeData();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="qrcode-modal" onClick={handleBackdropClick}>
      <div className="qrcode-modal-content">
        <button className="qrcode-close" onClick={onClose}>&times;</button>
        <h3 className="qrcode-title">{qrData.title}</h3>
        <img className="qrcode-image" src={qrData.image} alt="QR Code" />
        <p>{qrData.description}</p>
      </div>
    </div>
  );
};

export default QrCodeModal;

