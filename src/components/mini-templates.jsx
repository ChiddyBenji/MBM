import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

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
    { src: "/webflow.png", alt: "Webflow" },
    { src: "/zed.png", alt: "Zed" },
    { src: "/wix.png", alt: "Wix" },
    { src: "/shophify.png", alt: "Shopify" },
    { src: "/wordpress.png", alt: "WordPress" },
  ];

  const items = [
    { src: "/identity-one.png", alt: "Template 1" },
    { src: "/identity-two.png", alt: "Template 2" },
    { src: "/identity-three.png", alt: "Template 3" },
    { src: "/identity-four.png", alt: "Template 4" },
    { src: "/identity-five.png", alt: "Template 5" },
    { src: "/identity-six.png", alt: "Template 6" },
    { src: "/identity-seven.png", alt: "Template 7" },
    { src: "/identity-eight.png", alt: "Template 8" },
    
  ];

  return (
    <section id="mini-templates" className="mini-templates">
      <div className="mini-templates__header">
        <h2>Des blueprints web <br /> intemporels prêts à l&apos;emploi</h2>
        
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
