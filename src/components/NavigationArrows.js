import React, { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/style.css';

const NavigationArrows = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ['/', '/about', '/video', '/podcast', '/contact'];
  const currentIndex = routes.indexOf(location.pathname);

  const handlePrev = useCallback(() => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : routes.length - 1;
    navigate(routes[prevIndex]);
  }, [currentIndex, navigate, routes]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex < routes.length - 1 ? currentIndex + 1 : 0;
    navigate(routes[nextIndex]);
  }, [currentIndex, navigate, routes]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <div className="nav-arrows">
      <button className="arrow-btn prev-btn" onClick={handlePrev}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="arrow-btn next-btn" onClick={handleNext}>
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default NavigationArrows;

