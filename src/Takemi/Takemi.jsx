import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Takemi.css';
import LogoMini from '../assets/LogoMini.png';
import StartChattingButton from '../assets/StartChattingButton.png';
import NextButton from '../assets/NextButton.png';
import TakemiCutOut from '../assets/TakemiCutOut.png';

export default function Takemi() {
  const navigate = useNavigate();

  return (
    <div className="takemi-page">
      <img src={TakemiCutOut} alt="Takemi" className="takemi-cutout" />
      <button className="logo-mini-button" onClick={() => navigate('/')}>
        <img src={LogoMini} alt="Logo Mini" className="logo-mini" />
      </button>
      <button className="next-button" onClick={() => navigate('/kawakami')}>
        <img src={NextButton} alt="Next Button" />
      </button>
      <button className="start-chatting-button" onClick={() => {
        localStorage.setItem('selectedCharacter', 'Takemi');
        navigate('/chat');
      }}>
        <img src={StartChattingButton} alt="Start Chatting Button" />
      </button>
      {/* Add Takemi content here */}
    </div>
  );
}
