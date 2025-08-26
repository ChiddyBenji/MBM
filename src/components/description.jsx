import "../styles/App.scss";
import Dropdown from "../components/dropdown";
import SlideMobile from "../components/slidemobile";
import { useEffect, useRef, useState } from "react";

function Description() {
  const txtRef = useRef(null);
  const dropdownRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const txtdescription = [
    "Pourquoi choisir un design",
    "intemporel moderne et efficace ?",
  ];
  const p = [
    "Nous bâtissons les sites web comme des monuments.",
    "Conçus pour durer, s'adapter et rester attractifs.",
  ];

  useEffect(() => {
  const txtElement = txtRef.current;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
      }
    },
    { threshold: 0.4 }
  );

  if (txtElement) observer.observe(txtElement);

  return () => {
    if (txtElement) observer.unobserve(txtElement);
  };
}, []);


  return (
    <section id="how">
      <div className="content-description">
        <div
          ref={txtRef}
          className={`content-txt-description ${visible ? "fade-left" : ""}`}
        >
          <h2>
            {txtdescription.map((line, index) => (
              <span key={index}>
                {line}
                {index !== txtdescription.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p>
            {p.map((line, index) => (
              <span key={index}>
                {line}
                {index !== p.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>

        <div
          ref={dropdownRef}
          className={`content-dropdown-description ${
            visible ? "fade-right" : ""
          }`}
        >
          <div className="content-slide-mobile">
            <SlideMobile />
          </div>
          <div className="content-dropdown">
            <Dropdown />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Description;
