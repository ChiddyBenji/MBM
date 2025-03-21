import { useState } from "react";
import "../styles/App.scss";

function Dropdown() {
  const dropdowns = [
    { title: "INTEMPOREL", shape: "square" },
    { title: "MODERNE", shape: "circle" },
    { title: "EFFICACE", shape: "triangle" },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="cards-dropdown">
      {dropdowns.map((item, index) => (
        <div
          key={index}
          className={`dropdown ${openDropdown === index ? "open" : ""}`}
        >
          <div className="dropdown-header">
            <div className="left-content">
              {/* Appliquer une logique spéciale pour le triangle */}
              {item.shape === "triangle" ? (
                <div className="triangle"></div> // Applique un style triangle ici
              ) : (
                <div className={`shape ${item.shape}`}></div> // Pour square et circle
              )}
              {item.title}
            </div>
            <button
              className={`toggle-button ${
                openDropdown === index ? "open" : ""
              }`}
              onClick={() => toggleDropdown(index)}
            >
              +
            </button>
          </div>
          <div className="separator"></div>
          <div className="dropdown-content">
            <p>Contenu du menu {item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
