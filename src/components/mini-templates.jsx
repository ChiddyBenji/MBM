import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Logos “disponible sur”
import webflow from "../assets/webflow.png";
import zed from "../assets/zed.png";
import wix from "../assets/wix.png";
import shophify from "../assets/shophify.png";
import wordpress from "../assets/wordpress.png";

// Images (tu peux en ajouter/en retirer)
import idOne from "../assets/identity-one.png";
import idTwo from "../assets/identity-two.png";
import idThree from "../assets/identity-three.png";
import idFour from "../assets/identity-four.png";
import idFive from "../assets/identity-five.png";
import idSix from "../assets/identity-six.png";
import idSeven from "../assets/identity-seven.png";
import idEight from "../assets/identity-eight.png";


// --- Modal (Portal) ---
function Modal({ src, alt, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return ReactDOM.createPortal(
    <div className="mini-modal__overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="mini-modal__inner" onClick={(e) => e.stopPropagation()}>
        <button className="mini-modal__close" onClick={onClose} aria-label="Fermer">×</button>
        <img src={src} alt={alt || "Aperçu template"} />
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default function MiniTemplates() {
  const [zoomSrc, setZoomSrc] = useState(null);

  const icons = [
    { src: webflow, alt: "Webflow" },
    { src: zed, alt: "Zed" },
    { src: wix, alt: "Wix" },
    { src: shophify, alt: "Shopify" },
    { src: wordpress, alt: "WordPress" },
  ];

  const items = [
    { src: idOne, alt: "Template 1" },
    { src: idTwo, alt: "Template 2" },
    { src: idThree, alt: "Template 3" },
    { src: idFour, alt: "Template 4" },
    { src: idFive, alt: "Template 5" },
    { src: idSix, alt: "Template 6" },
    { src: idSeven, alt: "Template 7" },
    { src: idEight, alt: "Template 8" },
    
  ];

  return (
    <section id="mini-templates" className="mini-templates">
      <div className="mini-templates__header">
        <h2>Des blueprints web <br /> intemporels prêts à l’emploi</h2>
        
      </div>

      <div className="mini-templates__icons">
        <div className="mini-templates__icons-row">
          {icons.map((ic, i) => (
            <img key={i} src={ic.src} alt={ic.alt} width={32} height={32} loading="lazy" />
          ))}
        </div>
      </div>

      <div className="mini-templates__grid">
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            className="mini-card"
            onClick={() => setZoomSrc(it.src)}
            aria-label={`Agrandir ${it.alt}`}
          >
            <img src={it.src} alt={it.alt} loading="lazy" />
          </button>
        ))}
      </div>

      <div className="mini-templates__cta">
        <button className="btn-disco" type="button">Découvrez nos templates</button>
      </div>

      {zoomSrc && <Modal src={zoomSrc} onClose={() => setZoomSrc(null)} />}
    </section>
  );
}
