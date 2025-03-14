import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from './components/Container';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
// import Projects from './pages/Projects';
import AskAI from './pages/AskAI';
import Weather from './pages/Weather';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-me" element={<AboutMe />} />
          {/* <Route path="/projects" element={<Projects />} /> */}
          <Route path="/ask-ai" element={<AskAI />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;