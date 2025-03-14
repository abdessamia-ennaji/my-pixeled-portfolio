// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cell from '../components/Cell';
import cursorSound from '../assets/sounds/cursor.wav';
import selectSound from '../assets/sounds/select.wav';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const cursorAudio = new Audio(cursorSound);
  const selectAudio = new Audio(selectSound);

  const cells = [
    { iconName: 'User-Single-Aim--Streamline-Pixel', title: 'ABOUT ME', path: '/about-me' },
    { iconName: 'Coding-App-Website-Ui--Streamline-Pixel', title: 'PROJECTS', path: '/projects', iconClassName: 'icon' },
    { iconName: 'Technology-Robot-Ai--Streamline-Pixel', title: 'ASK AI', path: '/ask-ai', iconClassName: 'icon' },
    { iconName: 'Weather-Cloud-Sun-Fine--Streamline-Pixel', title: 'WEATHER', path: '/weather', iconClassName: 'icon' },
    { iconName: 'Interface-Essential-Trophy--Streamline-Pixel', title: 'CERTIFICATS', path: '/test-1', iconClassName: 'icon' },
    { iconName: 'Social-Rewards-Certified-Diploma--Streamline-Pixel', title: 'DIPLOMAS', path: '/test-2', iconClassName: 'icon' },
    { iconName: 'Map-Navigation-Compass-Direction--Streamline-Pixel', title: 'MY CITY', path: '/my-city', iconClassName: 'icon' },
    { iconName: 'Email-Envelope-Close--Streamline-Pixel', title: 'CONTACT', path: '/contact', iconClassName: 'icon' },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let newIndex = focusedIndex;

      switch (event.key.toLowerCase()) {
        case 'w': // Up
        case 'arrowup':
          newIndex = focusedIndex - 4 >= 0 ? focusedIndex - 4 : focusedIndex;
          break;
        case 's': // Down
        case 'arrowdown':
          newIndex = focusedIndex + 4 < cells.length ? focusedIndex + 4 : focusedIndex;
          break;
        case 'a': // Left
        case 'arrowleft':
          newIndex = focusedIndex % 4 > 0 ? focusedIndex - 1 : focusedIndex;
          break;
        case 'd': // Right
        case 'arrowright':
          newIndex = focusedIndex % 4 < 3 ? focusedIndex + 1 : focusedIndex;
          break;
        case 'enter':
          selectAudio.play();
          navigate(cells[focusedIndex].path);
          return;
        case 'escape':
          return; // Do nothing on Esc in Home page
        default:
          return;
      }

      if (newIndex !== focusedIndex) {
        cursorAudio.play();
        setFocusedIndex(newIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, navigate]);

  return (
    <>
      {cells.map((cell, index) => (
        <Cell
          key={index}
          iconName={cell.iconName}
          title={cell.title}
          iconClassName={cell.iconClassName}
          isFocused={index === focusedIndex}
        />
      ))}
    </>
  );
};

export default Home;