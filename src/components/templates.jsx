import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MiniTemplates from "../components/mini-templates";

// 🔁 Composant Modale via React Portal
function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

function TiltImage({ className, src, alt, onClick, scale }) {
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;
    const rotateY = ((x - centerX) / centerX) * -15;
    imgRef.current.style.transform = `perspective(600px) rotateY(${rotateY}deg) scale(${scale})`;
  };

  const resetRotation = () => {
    imgRef.current.style.transform = `perspective(600px) rotateY(0deg) scale(${scale})`;
  };

  return (
    <img
      ref={imgRef}
      className={`tilt-img ${className}`}
      src={src}
      alt={alt}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetRotation}
      onClick={onClick}
      style={{
        cursor: "zoom-in",
        transform: `scale(${scale})`,
        transition: "transform 0.3s ease",
      }}
    />
  );
}

function Template() {
  const [zoomImg, setZoomImg] = useState(null);
  const [scrollScale, setScrollScale] = useState(1);
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    const currentRef = containerRef.current;
    if (!currentRef) return;
    const rect = currentRef.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const visibleAmount = Math.max(0, Math.min(windowHeight, windowHeight - rect.top));
    const scaleFactor = 0.9 + (visibleAmount / windowHeight) * 0.1;
    setScrollScale(scaleFactor);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setZoomImg(null);
    }
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
      }
    },
    { threshold: 0.3 }
  );

  const currentRef = containerRef.current; // ✅ variable locale pour éviter l'erreur

  if (currentRef) observer.observe(currentRef);
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("keydown", handleKeyDown);

  return () => {
    if (currentRef) observer.unobserve(currentRef); // ✅ utilise la variable locale
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);


  // 🔒 Bloquer le scroll pendant la modale
  useEffect(() => {
    if (zoomImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoomImg]);

  const iconTemplate = [
    { src: "/webflow.png", alt: "Webflow" },
    { src: "/zed.png", alt: "Zed" },
    { src: "/wix.png", alt: "Wix" },
    { src: "/shophify.png", alt: "Shopify" },
    { src: "/wordpress.png", alt: "WordPress" },
  ];

  const imageGroups = {
    group1: [
      { className: "idTwo", src: "/identity-two.png", alt: "id-two" },
      { className: "idOne", src: "/identity-one.png", alt: "id-one" },
    ],
    group2: [
      { className: "idThree", src: "/identity-three.png", alt: "idThree" },
      { className: "idFour", src: "/identity-four.png", alt: "idFour" },
    ],
    group3: [
      { className: "idFive", src: "/identity-five.png", alt: "idFive" },
      { className: "idSix", src: "/identity-six.png", alt: "idSix" },
    ],
    group4: [
      { className: "idSeven", src: "/identity-seven.png", alt: "idSeven" },
      { className: "idNine", src: "/identity-nine.png", alt: "idNine" },
      { className: "idEight", src: "/identity-eight.png", alt: "idEight" },
    ],
    group5: [
      { className: "idTwelve", src: "/identity-twelve.png", alt: "idTwelve" },
      { className: "idEleven", src: "/identity-eleven.png", alt: "idEleven" },
      { className: "idThirteen", src: "/identity-thirteen.png", alt: "idThirteen" },
    ],
  };

  return (
    <section id="template">
      <div className={`content-templates ${visible ? "fade-in-section" : ""}`} ref={containerRef}>
        <div className="column-templates-one">
          <div>
            {imageGroups.group1.map((img, i) => (
              <TiltImage key={i} {...img} onClick={() => setZoomImg(img.src)} scale={scrollScale} />
            ))}
          </div>
          <div>
            <div className="content-templates-img">
              {imageGroups.group2.map((img, i) => (
                <TiltImage key={i} {...img} onClick={() => setZoomImg(img.src)} scale={scrollScale} />
              ))}
            </div>
            <p className="texte">
              Des blueprints web intemporels, <br /> prêts à l&apos;emploi.
            </p>
          </div>
          <div>
            {imageGroups.group3.map((img, i) => (
              <TiltImage key={i} {...img} onClick={() => setZoomImg(img.src)} scale={scrollScale} />
            ))}
          </div>
        </div>

        <div className="column-templates-two">
          <div>
            {imageGroups.group4.map((img, i) => (
              <TiltImage key={i} {...img} onClick={() => setZoomImg(img.src)} scale={scrollScale} />
            ))}
          </div>

          <div>
            <div className="content-img-one">
              <div>
                <div className="txt-dispo">Disponible sur</div>
                <div className="icon-txt">
                  {iconTemplate.map((icon, index) => (
                    <img key={index} src={icon.src} alt={icon.alt} width={40} height={40} />
                  ))}
                </div>
              </div>
              <div>
                <button className="btn-disco">Découvrez nos templates</button>
              </div>
            </div>

            <div className="content-img-two">
              <TiltImage className="dog" src="/identity-ten.png" alt="idTen" onClick={() => setZoomImg("/identity-ten.png")} scale={scrollScale} />
            </div>
          </div>

          <div>
            {imageGroups.group5.map((img, i) => (
              <TiltImage key={i} {...img} onClick={() => setZoomImg(img.src)} scale={scrollScale} />
            ))}
          </div>
        </div>

        {/* 🔥 PORTAL MODAL FIXE */}
        {zoomImg && (
          <Modal onClose={() => setZoomImg(null)}>
            <img src={zoomImg} alt="Zoomed template" />
          </Modal>
        )}
      </div>
       <MiniTemplates />
    </section>
  );
}

export default Template;
