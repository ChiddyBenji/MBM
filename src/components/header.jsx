import React, { useState, useEffect } from "react";
import "../styles/App.scss";
import logo from "../assets/logo.png";

function Header() {
  const buttons = ["Who", "How", "What", "Template", "Plans"];
  const [activeButton, setActiveButton] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const handleButtonClick = (index, id) => {
    setActiveButton(index);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="content-logo">
        <a href="#top" onClick={() => setActiveButton(null)}>
          <img src={logo} alt="Logo" className="logo" />
        </a>
      </div>

      <div className="content-link">
        {buttons.map((item, index) => {
          const id = item.toLowerCase();
          return (
            <button
              key={index}
              className={`nav-button ${activeButton === index ? "active" : ""}`}
              onClick={() => handleButtonClick(index, id)}
              aria-label={item}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="content-link-contact">
        <button
          className="contact-button"
          aria-label="Contact"
          onClick={() => {
            setActiveButton(null); // Réinitialise le bouton actif
            const section = document.getElementById("form");
            if (section) section.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Contact
        </button>
      </div>
    </header>
  );
}

export default Header;
