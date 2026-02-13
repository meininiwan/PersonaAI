import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Futaba.css';
import LogoMini from '../assets/LogoMini.png';
import StartChattingButton from '../assets/StartChattingButton.png';
import NextButton from '../assets/NextButton.png';
import FutabaCutOut from '../assets/FutabaCutOut.png';

export default function Futaba() {
  const navigate = useNavigate();

  return (
    <div className="futaba-page">
      <img src={FutabaCutOut} alt="Futaba" className="futaba-cutout" />
      <button className="logo-mini-button" onClick={() => navigate('/')}>
        <img src={LogoMini} alt="Logo Mini" className="logo-mini" />
      </button>
      <button className="next-button" onClick={() => navigate('/takemi')}>
        <img src={NextButton} alt="Next Button" />
      </button>
      <button className="start-chatting-button" onClick={() => {
        localStorage.setItem('selectedCharacter', 'Futaba');
        navigate('/chat');
      }}>
        <img src={StartChattingButton} alt="Start Chatting Button" />
      </button>
      {/* Add Futaba content here */}
    </div>
  );
}
