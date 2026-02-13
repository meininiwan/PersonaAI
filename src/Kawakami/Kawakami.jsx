import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Kawakami.css';
import LogoMini from '../assets/LogoMini.png';
import StartChattingButton from '../assets/StartChattingButton.png';
import NextButton from '../assets/NextButton.png';
import KawakamiCutOut from '../assets/KawakamiCutOut.png';

export default function Kawakami() {
  const navigate = useNavigate();

  return (
    <div className="kawakami-page">
      <img src={KawakamiCutOut} alt="Kawakami" className="kawakami-cutout" />
      <button className="logo-mini-button" onClick={() => navigate('/')}>
        <img src={LogoMini} alt="Logo Mini" className="logo-mini" />
      </button>
      <button className="next-button" onClick={() => navigate('/makoto')}>
        <img src={NextButton} alt="Next Button" />
      </button>
      <button className="start-chatting-button" onClick={() => {
        localStorage.setItem('selectedCharacter', 'Kawakami');
        navigate('/chat');
      }}>
        <img src={StartChattingButton} alt="Start Chatting Button" />
      </button>
      {/* Add Kawakami content here */}
    </div>
  );
}
