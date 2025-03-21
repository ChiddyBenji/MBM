import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  
import "../styles/App.scss";
import logo from "../assets/logo.png";

function Header() {
  const buttons = ["What", "Who", "How", "Plans"];
  const [activeButton, setActiveButton] = useState(null);
  const [scrolled, setScrolled] = useState(false); // État pour détecter le scroll

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="content-logo">
      <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="content-link">
        {buttons.map((item, index) => (
          <Link
            key={index}
            to={`/${item.toLowerCase()}`}  
            className={`nav-button ${activeButton === index ? "active" : ""}`}
            aria-label={item}
            onClick={() => handleButtonClick(index)}
          >
            {item}
          </Link>
        ))}
      </div>
      <div className="content-link-contact">
        <button className="contact-button" aria-label="Contact">
          Contact
        </button>
      </div>
    </header>
  );
}

export default Header;
