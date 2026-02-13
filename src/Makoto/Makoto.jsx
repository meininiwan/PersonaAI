import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Makoto.css';
import LogoMini from '../assets/LogoMini.png';
import StartChattingButton from '../assets/StartChattingButton.png';
import NextButton from '../assets/NextButton.png';
import MakotoCutOut from '../assets/MakotoCutOut.png';

export default function Makoto() {
  const navigate = useNavigate();

  return (
    <div className="makoto-page">
      <img src={MakotoCutOut} alt="Makoto" className="makoto-cutout" />
      <button className="logo-mini-button" onClick={() => navigate('/')}>
        <img src={LogoMini} alt="Logo Mini" className="logo-mini" />
      </button>
      <button className="next-button" onClick={() => navigate('/futaba')}>
        <img src={NextButton} alt="Next Button" />
      </button>
      <button className="start-chatting-button" onClick={() => {
        localStorage.setItem('selectedCharacter', 'Makoto');
        navigate('/chat');
      }}>
        <img src={StartChattingButton} alt="Start Chatting Button" />
      </button>
      {/* Add Makoto content here */}
    </div>
  );
}
