// src/pages/AboutMe.tsx
import React from 'react';
import { useBackNavigation } from '../hooks/useBackNavigation';
import './css/AboutMe.css';

const AboutMe: React.FC = () => {
  const handleBackClick = useBackNavigation();

  return (
    <div className="page-content">
      <h1>About Me</h1>
      <p>This is the about me page content.</p>
      <a href="/" onClick={handleBackClick} className="back-link">
        Back to Home
      </a>
    </div>
  );
};

export default AboutMe;