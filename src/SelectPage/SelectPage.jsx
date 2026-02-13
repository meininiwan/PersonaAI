import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectPage.css';
import LogoMini from '../assets/LogoMini.png';
import MakotoCard from '../assets/MakotoCard.gif';
import FutabaCard from '../assets/FutabaCard.gif';
import TakemiCard from '../assets/TakemiCard.gif';
import KawakamiCard from '../assets/KawakamiCard.gif';

export default function SelectPage() {
  const navigate = useNavigate();

  return (
    <div className="select-page">
      <button className="logo-mini-button" onClick={() => navigate('/')}>
        <img src={LogoMini} alt="Logo Mini" className="logo-mini" />
      </button>
      <div className="cards-container">
        <button className="card-button" onClick={() => navigate('/makoto')}>
          <img src={MakotoCard} alt="Makoto Card" className="card-image" />
        </button>
        <button className="card-button" onClick={() => navigate('/futaba')}>
          <img src={FutabaCard} alt="Futaba Card" className="card-image" />
        </button>
        <button className="card-button" onClick={() => navigate('/takemi')}>
          <img src={TakemiCard} alt="Takemi Card" className="card-image" />
        </button>
        <button className="card-button" onClick={() => navigate('/kawakami')}>
          <img src={KawakamiCard} alt="Kawakami Card" className="card-image" />
        </button>
      </div>
    </div>
  );
}
