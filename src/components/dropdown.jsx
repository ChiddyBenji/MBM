import { useState } from "react";
import "../styles/App.scss";

function Dropdown() {
  const dropdowns = [
    {
      title: "INTEMPOREL",
      shape: "square",
      content: "Un style intemporel qui traverse les époques.",
    },
    {
      title: "MODERNE",
      shape: "circle",
      content: "Un design moderne qui s’adapte aux tendances actuelles.",
    },
    {
      title: "EFFICACE",
      shape: "triangle",
      content:
        "Chaque pixel a un rôle. Conversion, navigation, accessibilité : nous optimisons chaque détail pour vos objectifs.",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="cards-dropdown">
      {dropdowns.map((item, index) => (
        <div
          key={index}
          className="dropdown"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="dropdown-header">
            <div className="left-content">
              {item.shape === "triangle" ? (
                <div className="triangle"></div>
              ) : (
                <div className={`shape ${item.shape}`}></div>
              )}
              {item.title}
            </div>
            <button className="toggle-button">
              {hoveredIndex === index ? "-" : "+"}
            </button>
          </div>
          <div className="dropdown-content">
            <p>{item.content}</p>
          </div>
          <div className="separator"></div>
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
