import React, { useState } from 'react';
import QrCodeModal from '../components/QrCodeModal';
import { submitContactForm } from '../services/api';
import '../styles/style.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrType, setQrType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      });
      
      // Success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      // Error
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQrCodeClick = (type) => {
    setQrType(type);
    setIsQrModalOpen(true);
  };

  return (
    <>
      <main className="main-content">
        <div className="contact-content">
          <div className="contact-header">
            <h2>Contact</h2>
            <p>Feel free to reach out to me</p>
          </div>
          
          <div className="contact-main">
            <div className="contact-info-section">
              <h3>Contact Me</h3>
              <p>I am always open for a chat</p>
              
              <div className="info-item" style={{ marginTop: '20px' }}>
                <i className="fas fa-map-marker-alt" style={{ marginRight: '15px', color: '#666' }}></i>
                <span>Shanghai, China</span>
              </div>
              
              <div className="info-item" style={{ marginTop: '20px' }}>
                <i className="fas fa-envelope" style={{ marginRight: '15px', color: '#666' }}></i>
                <span>3571676852@qq.com</span>
              </div>
              
              <div className="info-item" style={{ marginTop: '20px' }}>
                <i className="fas fa-phone" style={{ marginRight: '15px', color: '#666' }}></i>
                <span>+86 150 2137 3202</span>
              </div>
              
              <div className="social-links" style={{ marginTop: '30px' }}>
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
            
            <div className="contact-form-section">
              <h3>Contact Form</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                {/* Success message */}
                {submitStatus === 'success' && (
                  <div style={{
                    padding: '15px',
                    backgroundColor: '#d4edda',
                    border: '1px solid #c3e6cb',
                    borderRadius: '5px',
                    marginBottom: '20px',
                    color: '#155724',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <i className="fas fa-check-circle" style={{ fontSize: '20px' }}></i>
                    <span>Thank you for your message! I'll get back to you soon.</span>
                  </div>
                )}
                
                {/* Error message */}
                {submitStatus === 'error' && (
                  <div style={{
                    padding: '15px',
                    backgroundColor: '#f8d7da',
                    border: '1px solid #f5c6cb',
                    borderRadius: '5px',
                    marginBottom: '20px',
                    color: '#721c24',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <i className="fas fa-exclamation-circle" style={{ fontSize: '20px' }}></i>
                    <span>{errorMessage}</span>
                  </div>
                )}
                
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    required 
                  />
                  <i className="fas fa-user"></i>
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address" 
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    required 
                  />
                  <i className="fas fa-envelope"></i>
                </div>
                
                <div className="form-group">
                  <textarea 
                    name="message"
                  
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    required
                    rows="5"
                  ></textarea>
                  <i className="fas fa-comment"></i>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                  style={{
                    opacity: isSubmitting ? 0.6 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                      Sending...
                    </>
                  ) : (
                    'Send message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <QrCodeModal 
        isOpen={isQrModalOpen}
        type={qrType}
        onClose={() => setIsQrModalOpen(false)}
      />
    </>
  );
};

export default Contact;

