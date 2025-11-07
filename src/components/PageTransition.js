import { useEffect } from 'react';

const PageTransition = () => {
  useEffect(() => {
    const container = document.querySelector('.container');
    if (container) {
      // Remove previous animation classes
      container.classList.remove('page-enter', 'page-exit', 'page-exit-prev');
      
      // Add page enter animation
      requestAnimationFrame(() => {
        container.classList.add('page-enter');
      });
    }
  });

  return null;
};

export default PageTransition;

