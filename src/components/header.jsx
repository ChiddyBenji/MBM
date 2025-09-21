import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/App.scss";
import logo from "../assets/logo.png";

function Header() {
  const buttons = ["Who", "How", "What", "Template", "Plans"];
  const [activeButton, setActiveButton] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToId = (id) => {
    if (id === "plans") {
      window.dispatchEvent(new CustomEvent("resetStepToOne", { detail: id }));
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleButtonClick = (index, id) => {
    setActiveButton(index);
    scrollToId(id);
  };

  // Click liens du menu mobile
  const handleMobileNav = (id) => {
    scrollToId(id);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Verrouiller le scroll du body quand le menu est ouvert
  useEffect(() => {
    document.body.classList.toggle("no-scroll", isMenuOpen);
  }, [isMenuOpen]);

  // Fermer au clavier (Échap)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="content-logo">
          <button
            onClick={() => {
              setActiveButton(null);
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsMenuOpen(false);
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
                className={`nav-button ${
                  activeButton === index ? "active" : ""
                }`}
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

        {/* Bouton burger (caché desktop, visible mobile) */}
        <div className="content-burger">
          <button
            className={`burger ${isMenuOpen ? "open" : ""}`}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Backdrop + Panneau menu mobile */}
      <div
        className={`menu-backdrop ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      />
      <nav
        id="mobile-menu"
        className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <button
          className="close-menu"
          aria-label="Fermer le menu"
          onClick={() => setIsMenuOpen(false)}
        >
          <span />
          <span />
        </button>
        <ul className="mobile-nav">
          {buttons.map((item) => {
            const id = item.toLowerCase();
            return (
              <li key={id}>
                <button onClick={() => handleMobileNav(id)}>{item}</button>
              </li>
            );
          })}
          <li className="contact-cta">
            <button
              onClick={() => {
                handleMobileNav("form");
              }}
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
