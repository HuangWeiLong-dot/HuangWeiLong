import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NavigationArrows from './components/NavigationArrows';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Video from './pages/Video';
import Podcast from './pages/Podcast';
import './styles/style.css';

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="container">
      <Sidebar />
      <PageTransition key={location.pathname} />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/video" element={<Video />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <NavigationArrows />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

