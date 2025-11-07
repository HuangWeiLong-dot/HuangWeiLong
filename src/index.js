import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Enable JS for CSS transitions
document.documentElement.classList.add('js-enabled');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

