import { useRef, useEffect } from 'react';

export const use3DEffect = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const xPosition = (e.clientX - rect.left - width / 2) / width;
      const yPosition = (height / 2 - (e.clientY - rect.top)) / height;

      const maxRotationX = 45;
      const maxRotationY = 45;

      const rotationX = yPosition * maxRotationX;
      const rotationY = xPosition * maxRotationY;

      container.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    const handleMouseDown = () => {
      container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(0.95, 0.95, 0.95)';
    };

    const handleMouseUp = (e) => {
      const mouseEvent = new MouseEvent('mousemove', { 
        clientX: e.clientX, 
        clientY: e.clientY 
      });
      container.dispatchEvent(mouseEvent);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return containerRef;
};

