import React, { useState } from 'react';
import '../styles/App.scss';
import logo from '../assets/logo.png';

function Header() {
  const buttons = ["What", "Who", "How", "Plans"];
  const [activeButton, setActiveButton] = useState(null); 
  const contactButton = { label: "Contact", className: "contact-button" };

  const handleButtonClick = (index) => {
    setActiveButton(index); 
  };

  return (
    <header className="header">
      <div className="content-logo">
        <img src={logo} alt="" className="logo" />
      </div>
      <div className="content-link">
        {buttons.map((item, index) => (
          <button
            key={index}
            className={`nav-button ${activeButton === index ? 'active' : ''}`} 
            aria-label={item}
            onClick={() => handleButtonClick(index)} 
          >
            {item}
          </button>
        ))}
      </div>
      <div className="content-link-contact">
        <button className={contactButton.className} aria-label={contactButton.label}>
          {contactButton.label}
        </button>
      </div>
    </header>
  );
};

export default Header;
