import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.scss";
import logo from "../assets/logo.png";

function Header() {
  const buttons = ["Who", "How", "What", "Template", "Plans"];
  const [activeButton, setActiveButton] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = (index, id) => {
    setActiveButton(index);

    if (id === "plans") {
      // Émet un événement personnalisé pour déclencher la remise à zéro et le scroll
      window.dispatchEvent(new CustomEvent("resetStepToOne", { detail: id }));
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
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
        <button
          onClick={() => {
            setActiveButton(null);
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="logo-button"
          aria-label="Retour à l’accueil"
        >
          <img src={logo} alt="Logo" className="logo" />
        </button>
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
            setActiveButton(null);
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
