import { useRef, useState, useEffect } from "react";
import webflow from "../assets/webflow.png";
import zed from "../assets/zed.png";
import wix from "../assets/wix.png";
import shophify from "../assets/shophify.png";
import wordpress from "../assets/wordpress.png";
import fox from "../assets/fox.jpg";
import cat from "../assets/cat.jpg";
import dog from "../assets/dog.jpg";

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
      style={{ cursor: "zoom-in", transform: `scale(${scale})`, transition: "transform 0.3s ease" }}
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

    const currentRef = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (currentRef) observer.observe(currentRef);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const iconTemplate = [
    { src: webflow, alt: "Webflow" },
    { src: zed, alt: "Zed" },
    { src: wix, alt: "Wix" },
    { src: shophify, alt: "Shopify" },
    { src: wordpress, alt: "WordPress" },
  ];

  const imageGroups = {
    group1: [
      { className: "dog", src: dog, alt: "dog" },
      { className: "fox", src: fox, alt: "fox" },
    ],
    group2: [
      { className: "fox", src: fox, alt: "fox" },
      { className: "cat", src: cat, alt: "cat" },
    ],
    group3: [
      { className: "cat", src: cat, alt: "cat" },
      { className: "dog", src: dog, alt: "dog" },
    ],
    group4: [
      { className: "cat", src: cat, alt: "cat" },
      { className: "dog", src: dog, alt: "dog" },
      { className: "fox", src: fox, alt: "fox" },
    ],
    group5: [
      { className: "fox", src: fox, alt: "fox" },
      { className: "cat", src: cat, alt: "cat" },
      { className: "dog", src: dog, alt: "dog" },
    ],
  };

  return (
    <section id="template">
      <div
        className={`content-templates ${visible ? "fade-in-section" : ""}`}
        ref={containerRef}
      >
        <div className="column-templates-one">
          <div>
            {imageGroups.group1.map((img, i) => (
              <TiltImage key={i} className={img.className} src={img.src} alt={img.alt} onClick={() => setZoomImg(img.src)} scale={scrollScale} />
            ))}
          </div>
          <div>
            <div className="content-templates-img">
              {imageGroups.group2.map((img, i) => (
                <TiltImage key={i} className={img.className} src={img.src} alt={img.alt} onClick={() => setZoomImg(img.src)} scale={scrollScale} />
              ))}
            </div>
            <p className="texte">
              Des blueprints web intemporels, <br /> prêts à l’emploi.
            </p>
          </div>
          <div>
            {imageGroups.group3.map((img, i) => (
              <TiltImage key={i} className={img.className} src={img.src} alt={img.alt} onClick={() => setZoomImg(img.src)} scale={scrollScale} />
            ))}
          </div>
        </div>

        <div className="column-templates-two">
          <div>
            {imageGroups.group4.map((img, i) => (
              <TiltImage key={i} className={img.className} src={img.src} alt={img.alt} onClick={() => setZoomImg(img.src)} scale={scrollScale} />
            ))}
          </div>

          <div>
            <div className="content-img-one">
              <div>
                <div className="txt-dispo">Disponible sur</div>
                <div className="icon-txt">
                  {iconTemplate.map((icon, index) => (
                    <img
                      key={index}
                      src={icon.src}
                      alt={icon.alt}
                      width={40}
                      height={40}
                    />
                  ))}
                </div>
              </div>
              <div>
                <button className="btn-disco">Découvrez nos templates</button>
              </div>
            </div>

            <div className="content-img-two">
              <TiltImage className="dog" src={dog} alt="dog" onClick={() => setZoomImg(dog)} scale={scrollScale} />
            </div>
          </div>

          <div>
            {imageGroups.group5.map((img, i) => (
              <TiltImage key={i} className={img.className} src={img.src} alt={img.alt} onClick={() => setZoomImg(img.src)} scale={scrollScale} />
            ))}
          </div>
        </div>

        {zoomImg && (
          <div className="modal-overlay" onClick={() => setZoomImg(null)}>
            <div className="modal-content">
              <img src={zoomImg} alt="Zoomed template" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Template;
