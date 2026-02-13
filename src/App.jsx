import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Homepage from './Homepage/Homepage';
import SelectPage from './SelectPage/SelectPage';
import ChatPage from './ChatPage/ChatPage';
import Makoto from './Makoto/Makoto';
import Futaba from './Futaba/Futaba';
import Takemi from './Takemi/Takemi';
import Kawakami from './Kawakami/Kawakami';
import MusicButton from './assets/MusicButton.png';
import BeneathTheMask from './assets/Beneath the Mask.mp3';
import './App.css';

export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState('normal'); // 'normal', 'hover', 'text'
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      const target = e.target;
      
      // Check if hovering over clickable elements first (including elements with pointer cursor)
      const isClickable = target.closest('button, a, [onclick], input[type="button"], input[type="submit"], [role="button"]');
      const computedStyle = window.getComputedStyle(target);
      const hasPointerCursor = computedStyle.cursor === 'pointer' || target.style.cursor === 'pointer';
      
      if (isClickable || hasPointerCursor) {
        setCursorState('hover');
      } else {
        // Check if hovering over text content or text inputs
        const isTextElement = target.closest('p, span, li, td, th, label, textarea, input[type="text"], input[type="email"], input[type="password"], .message-bubble, .bubble-content');
        const isTextInput = target.tagName === 'TEXTAREA' || (target.tagName === 'INPUT' && (target.type === 'text' || target.type === 'email' || target.type === 'password'));
        
        if (isTextElement || isTextInput) {
          setCursorState('text');
        } else {
          setCursorState('normal');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={BeneathTheMask} loop />
      <button className={`global-music-button ${isPlaying ? 'playing' : ''}`} onClick={toggleMusic}>
        <img src={MusicButton} alt="Music" />
      </button>
      <div 
        className={`custom-cursor ${cursorState === 'hover' ? 'cursor-hover' : ''} ${cursorState === 'text' ? 'cursor-text' : ''}`}
        style={{ 
          left: `${cursorPos.x}px`, 
          top: `${cursorPos.y}px` 
        }}
      />
      <div 
        className="cursor-glow" 
        style={{ 
          left: `${cursorPos.x}px`, 
          top: `${cursorPos.y}px` 
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/makoto" element={<Makoto />} />
          <Route path="/futaba" element={<Futaba />} />
          <Route path="/takemi" element={<Takemi />} />
          <Route path="/kawakami" element={<Kawakami />} />
        </Routes>
      </Router>
    </>
  );
}
