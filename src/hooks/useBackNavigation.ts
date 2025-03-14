// src/hooks/useBackNavigation.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backSound from '../assets/sounds/back.wav';

export const useBackNavigation = () => {
  const navigate = useNavigate();
  const backAudio = new Audio(backSound);

  // Handle Esc key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        backAudio.play();
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Handler for click events
  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Prevent immediate navigation
    backAudio.play();
    setTimeout(() => navigate('/'), 100); // Slight delay to ensure sound plays
  };

  return handleBackClick;
};