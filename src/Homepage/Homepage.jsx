import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import PersonaBackground from '../assets/PersonaBackground.png';
import Logo from '../assets/Logo.png';
import Goobers from '../assets/Goobers.png';
import StartButton from '../assets/StartButton.png';
import SelectButton from '../assets/SelectButton.png';

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div 
      className="homepage"
      style={{
        backgroundImage: `url(${PersonaBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <img src={Logo} alt="Logo" className="logo" />
      <div className="button-container">
        <button className="button-wrapper" onClick={() => navigate('/chat')}>
          <img src={StartButton} alt="Start Button" />
        </button>
        <button className="button-wrapper" onClick={() => navigate('/select')}>
          <img src={SelectButton} alt="Select Button" />
        </button>
      </div>
      <img src={Goobers} alt="Goobers" className="goobers" />
    </div>
  );
}
