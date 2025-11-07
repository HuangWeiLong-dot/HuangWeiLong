import React, { useState, useEffect } from 'react';
import '../styles/style.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts with a small delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const title = "Huang Wei Long";
  
  // Assign directions to each character (excluding spaces)
  const getDirection = (charIndex) => {
    const directions = ['top', 'bottom', 'left', 'right', 'top', 'bottom', 'left', 'right', 'top', 'bottom', 'left', 'right', 'top', 'bottom', 'left'];
    // Count only non-space characters up to and including this index
    let charCount = 0;
    for (let i = 0; i <= charIndex; i++) {
      if (title[i] !== ' ') charCount++;
    }
    // Use charCount - 1 because we want 0-based index for array
    return directions[(charCount - 1) % directions.length];
  };
  
  // Get character position (excluding spaces) for animation delay
  const getCharPosition = (charIndex) => {
    let charPosition = 0;
    for (let i = 0; i < charIndex; i++) {
      if (title[i] !== ' ') charPosition++;
    }
    return charPosition;
  };

  return (
    <main className="main-content">
      <div className="home-content">
        <h1 className={isVisible ? 'animated-title' : ''}>
          {title.split('').map((char, index) => {
            // Handle spaces
            if (char === ' ') {
              return <span key={index} className="char-space">{char}</span>;
            }
            const direction = getDirection(index);
            const charPosition = getCharPosition(index);
            return (
              <span
                key={index}
                className={`char char-${direction}`}
                style={{
                  animationDelay: `${charPosition * 0.08}s`,
                  display: 'inline-block'
                }}
              >
                {char}
              </span>
            );
          })}
        </h1>
        <p className="subtitle">Amateur In Being a Human</p>
        <p className="definition">An individual who frequently finds the basic protocols of social existence</p>
        <p className="definition">such as small talk, emotional regulation</p>
        <p className="definition">and adulting, unnecessarily complicated and who is probably still figuring out the user manual.</p>
      </div>
    </main>
  );
};

export default Home;

