import React, { useState } from 'react';
import ImageModal from '../components/ImageModal';
import QrCodeModal from '../components/QrCodeModal';
import { use3DEffect } from '../hooks/use3DEffect';
import '../styles/style.css';

const About = () => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrType, setQrType] = useState('');
  const aboutImageRef = use3DEffect();

  const handleImageClick = (imgSrc) => {
    setSelectedImage(imgSrc);
    setIsImageModalOpen(true);
  };

  const handleQrCodeClick = (type) => {
    setQrType(type);
    setIsQrModalOpen(true);
  };

  return (
    <>
      <main className="main-content">
        <div className="about-content">
          <div className="about-header">
            <h2>About Me</h2>
            <p>Tone-deaf, Lacks social grace, Socially inept</p>
          </div>
          
          <div className="about-main">
            <div className="about-image" ref={aboutImageRef}>
              <img 
                src="/images/Full-body.jpg" 
                alt="Huang Wei Long" 
                className="profile-large"
                onClick={() => handleImageClick('/images/Full-body.jpg')}
              />
              <div className="image-caption">
                <p>My 16 years old picture</p>
              </div>
            </div>
            
            <div className="about-text">
              <h3></h3>
              <p>Someone who navigates life without the grace of innate social intuition, treating each interaction as a practice and every mistake as a lesson. A perpetual student of the human condition.</p> 
            </div>
            
            <div className="contact-info">
              <h3>Contact Information</h3>
              <div className="info-item">
                <strong>Country:</strong>China
              </div>
              <div className="info-item">
                <strong>City:</strong> Shanghai
              </div>
              <div className="info-item">
                <strong>Email:</strong> 3571676852@qq.com
              </div>
              <div className="info-item">
                <strong>Phone:</strong> +86 150 2137 3202
              </div>
              <div className="social-links">
                <a 
                  href="#"
                  title="QQ QR Code" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleQrCodeClick('qq');
                  }}
                >
                  <i className="fab fa-qq" style={{ fontSize: '24px' }}></i>
                </a>
                <a 
                  href="#"
                  title="WeChat QR Code" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleQrCodeClick('wechat');
                  }}
                >
                  <i className="fab fa-weixin" style={{ fontSize: '24px' }}></i>
                </a>
                <a 
                  href="mailto:3571676852@qq.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Send Email"
                >
                  <i className="fas fa-envelope" style={{ fontSize: '24px' }}></i>
                </a>
              </div>
            </div>
          </div>
          
          
        </div>
      </main>
      <ImageModal 
        isOpen={isImageModalOpen}
        imageSrc={selectedImage}
        onClose={() => setIsImageModalOpen(false)}
      />
      <QrCodeModal 
        isOpen={isQrModalOpen}
        type={qrType}
        onClose={() => setIsQrModalOpen(false)}
      />
    </>
  );
};

export default About;

