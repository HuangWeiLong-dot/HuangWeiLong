import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { use3DEffect } from '../hooks/use3DEffect';
import '../styles/style.css';

const Sidebar = () => {
  const location = useLocation();
  const imageContainerRef = use3DEffect();

  const navLinks = [
    { path: '/', icon: 'fa-home', label: 'Home' },
    { path: '/about', icon: 'fa-user', label: 'About Me' },
    { path: '/video', icon: 'fa-video', label: 'Video' },
    { path: '/podcast', icon: 'fa-podcast', label: 'Podcast' },
    { path: '/contact', icon: 'fa-envelope', label: 'Contact Me' }
  ];

  return (
    <nav className="sidebar">
      <div className="profile">
        <div className="image-container" ref={imageContainerRef}>
          <img 
            src="/images/Man.jpg" 
            alt="Huang Wei Long" 
            className="profile-img" 
          />
        </div>
        <h3 className="profile-name">Huang Wei Long</h3>
      </div>
      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.path}>
            <NavLink 
              to={link.path}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              end={link.path === '/'}
            >
              <i className={`fas ${link.icon}`}></i> {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;

