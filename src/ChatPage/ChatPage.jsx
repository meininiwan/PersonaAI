import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatPage.css';
import { sendMessageToGemini } from '../services/gemini';
import LogoMini from '../assets/LogoMini.png';
import MusicButton from '../assets/MusicButton.png';
import BeneathTheMask from '../assets/Beneath the Mask.mp3';

// Import icons
import MakotoIcon from '../assets/MakotoIcon.png';
import FutabaIcon from '../assets/FutabaIcon.png';
import TakemiIcon from '../assets/TakemiIcon.png';
import KawakamiIcon from '../assets/KawakamiIcon.png';
import RenIcon from '../assets/RenIcon.png';

// Import Cards (GIFs)
import MakotoCard from '../assets/MakotoCard.gif';
import FutabaCard from '../assets/FutabaCard.gif';
import TakemiCard from '../assets/TakemiCard.gif';
import KawakamiCard from '../assets/KawakamiCard.gif';

const CHARACTERS = {
  Makoto: { id: 'Makoto', name: 'Makoto Niijima', icon: MakotoIcon, card: MakotoCard },
  Futaba: { id: 'Futaba', name: 'Futaba Sakura', icon: FutabaIcon, card: FutabaCard },
  Takemi: { id: 'Takemi', name: 'Tae Takemi', icon: TakemiIcon, card: TakemiCard },
  Kawakami: { id: 'Kawakami', name: 'Sadayo Kawakami', icon: KawakamiIcon, card: KawakamiCard },
};

const GREETINGS = {
  Makoto: `*The infirmary smelled like antiseptic and bad decisions. You winced as you pressed an ice pack against your bruised cheek, staring at the ceiling tiles above you. Your knuckles still stung from the punches you had thrown earlier, and the faint taste of blood linger in your mouth.*

*You barely had time to sigh before you heard the sharp, purposeful click of shoes against the linoleum floor. Oh no.*

"You're unbelievable, you know that?"

*Makoto Niijima's sharp voice cut through the quiet walls of the infirmary, since the school day had ended, and most students had already gone home. But you wasn't so lucky. Makoto had her arms crossed, foot tapping, her gaze filled with disapproval. She sighed, shaking her head.* "A fight? Really?"

*You turned your head and met Makoto's piercing gaze, with that same look of disappointment she always gave you whenever they did something stupid—which, in her opinion, was often. "You got into another fight, In the middle of school. Again." she said, her voice tight with frustration. "Seriously!" She sighed, pinching the bridge of her nose as her voice softens.* "You're lucky you're not suspended yet... What would you do without me? Ugh, Really..!"`,
  
  Futaba: `*You just finished up some lunch, making two plates of food once you were done cooking. One plate for you, and another for your sister. You pick both plates up, making your way down the hallway. As soon as your sister hears your footsteps and smells the scent of fresh food her door comes flying open. You didn't even need to knock.*

"What'cha make? It smells really good!"

*She asked with a smile, leaving her rather dark room to look over at the food you had in hand.*`,
  
  Takemi: `*Tae flips open a medical journal on her desk for what feels like the millionth time today, but her concentration keeps slipping. With a frustrated sigh, she snaps it shut, pushing herself away from the cluttered desk. The familiar clink of her choker's chains reverberates in the silent room, highlighting just how alone she is.*

*Grumbling to herself, she pulls out her phone and scrolls aimlessly, thinking about social ties she never maintains.* "Shit, why not," *She mutters under her breath. She dials Mein's number, tapping her black platform heel on the ground as the line rings.*

"Oi, it's me," *She says when they picks up.* "I'm not cooking up anything new today. Just... Come over if you want. Don't expect experiments or stuff. Maybe you want to cuddle or something," *She adds with more bite than necessary, cringing slightly at her own words. The vulnerability in the offer makes her shift uncomfortably, running a red-nailed hand through her messy bob.*

*She hangs up before hearing their reply, tossing the phone aside.* "Fuck... This is so out of character..." *Tae runs her fingers along the edge of her desk, contemplating this unusual emotional shift. When she hears a knock at her clinic door, she straightens up, steadying herself with a deep breath.* "Guess loneliness fucks with everyone." *She murmurs. Standing tall despite her short frame, she slides the door open, her dark eyes meeting Mein's as she ushers them in with a tilt of her head, saying nothing more.*`,
  
  Kawakami: `*Kawakami sat in her dimly lit classroom at her desk, the familiar scent of chalk and old textbooks surrounding her.* 

*Kawakami is in the midst of, organizing a pile of papers, looking weary from the day's challenges. She glances up, her eyes softening when she sees someone enter the classroom, so suddenly it almost startled her.*

 "You're here late..." *She remarks, flashing a friendly smile in their direction.* "What can I help you with?" *Her voice is gentle, hinting at the care she often disguises beneath her professional facade.*`
};

export default function ChatPage() {
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);

  // Function to parse markdown-style formatting
  const formatMessage = (text) => {
    const parts = [];
    let currentIndex = 0;
    let keyCounter = 0;

    // Regex to match ***text***, **text**, or *text*
    const regex = /(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        parts.push(text.substring(currentIndex, match.index));
      }

      const matched = match[0];
      if (matched.startsWith('***') && matched.endsWith('***')) {
        // Bold and italic
        const content = matched.slice(3, -3);
        parts.push(<strong key={keyCounter++}><em>{content}</em></strong>);
      } else if (matched.startsWith('**') && matched.endsWith('**')) {
        // Bold
        const content = matched.slice(2, -2);
        parts.push(<strong key={keyCounter++}>{content}</strong>);
      } else if (matched.startsWith('*') && matched.endsWith('*')) {
        // Italic
        const content = matched.slice(1, -1);
        parts.push(<em key={keyCounter++}>{content}</em>);
      }

      currentIndex = match.index + matched.length;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  useEffect(() => {
    const selected = localStorage.getItem('selectedCharacter');
    const charToSet = (selected && CHARACTERS[selected]) ? selected : 'Makoto';
    setCharacter(charToSet);
    
    // Add greeting as first message
    if (GREETINGS[charToSet]) {
      setMessages([{ role: 'model', text: GREETINGS[charToSet] }]);
    }
  }, []);

  const handleCharacterSelect = (charId) => {
    setCharacter(charId);
    localStorage.setItem('selectedCharacter', charId);
    // Set greeting as first message when switching characters
    if (GREETINGS[charId]) {
      setMessages([{ role: 'model', text: GREETINGS[charId] }]);
    } else {
      setMessages([]);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !character || isLoading) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const responseText = await sendMessageToGemini(character, history, userMessage.text);

      const botMessage = { role: 'model', text: responseText };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage = { role: 'model', text: "Error: Could not connect to the Phantom Thieves network. Please check your API key." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

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

  if (!character) return <div className="loading-screen">Loading...</div>;

  const charData = CHARACTERS[character];

  return (
    <div className="chat-page-container">
      <audio ref={audioRef} src={BeneathTheMask} loop />
      <div className="sidebar-logo" onClick={() => navigate('/')}>
        <img src={LogoMini} alt="P5 Logo" />
      </div>
      <div className="character-list">
        {Object.values(CHARACTERS).map((char) => (
            <button
              key={char.id}
              className={`character-select-btn ${character === char.id ? 'active' : ''}`}
              onClick={() => handleCharacterSelect(char.id)}
            >
              <img src={char.card} alt={char.name} />
            </button>
          ))}
      </div>

      <div className="main-chat-area">
        <button className={`music-button ${isPlaying ? 'playing' : ''}`} onClick={toggleMusic}>
          <img src={MusicButton} alt="Music" />
        </button>
        <div className="chat-header-decoration">
          <h2 onClick={() => navigate(`/${character.toLowerCase()}`)} style={{ cursor: 'pointer' }}>
            {charData.name}
          </h2>
        </div>

        <div className="messages-scroll-area">
          {messages.map((msg, index) => (
            <div key={index} className={`message-row ${msg.role === 'user' ? 'user-row' : 'bot-row'}`}>
              {msg.role === 'model' && (
                <div className="avatar-container bot-avatar">
                  <img src={charData.icon} alt={character} />
                </div>
              )}

              <div className={`message-bubble ${msg.role === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                <div className="bubble-content">
                  {formatMessage(msg.text)}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="avatar-container user-avatar">
                  <img src={RenIcon} alt="You" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="message-row bot-row">
              <div className="avatar-container bot-avatar">
                <img src={charData.icon} alt={character} />
              </div>
              <div className="message-bubble bot-bubble loading-bubble">
                ...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="input-bar-container" onSubmit={handleSend}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${charData.name}...`}
            disabled={isLoading}
            className="p5-input"
            rows={1}
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="p5-send-button">
            SEND!
          </button>
        </form>
      </div>
    </div>
  );
}
