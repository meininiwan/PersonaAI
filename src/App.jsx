import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import SelectPage from './SelectPage/SelectPage';
import ChatPage from './ChatPage/ChatPage';
import Makoto from './Makoto/Makoto';
import Futaba from './Futaba/Futaba';
import Takemi from './Takemi/Takemi';
import Kawakami from './Kawakami/Kawakami';
import './App.css';

export default function App() {
  return (
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
  );
}
