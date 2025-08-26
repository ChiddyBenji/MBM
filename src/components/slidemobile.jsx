import { useRef, useState } from "react";
import dcube from "../assets/dcube.png";
import dglobe from "../assets/dglobe.png";
import dtriangle from "../assets/dtriangle.png";

function SlideMobile() {
  const slides = [
    {
      img: dcube,
      title: "INTEMPOREL",
      content: "Un style intemporel qui traverse les époques.",
    },
    {
      img: dglobe,
      title: "MODERNE",
      content: "Un design moderne qui s’adapte aux tendances actuelles.",
    },
    {
      img: dtriangle,
      title: "EFFICACE",
      content: [
        "Chaque pixel a un rôle.",
        "Conversion, navigation, accessibilité : nous optimisons chaque détail pour vos objectifs."
      ].join("\n"),
    },
  ];

  const [index, setIndex] = useState(0);
  const startX = useRef(null);

  const goTo = (i) => setIndex((i + slides.length) % slides.length);

  // Swipe mobile
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    if (startX.current == null) return;
    const dx = e.touches[0].clientX - startX.current;
    const THRESHOLD = 40;
    if (dx > THRESHOLD) {
      goTo(index - 1);
      startX.current = null;
    }
    if (dx < -THRESHOLD) {
      goTo(index + 1);
      startX.current = null;
    }
  };
  const onTouchEnd = () => {
    startX.current = null;
  };

  // Accessibilité clavier (optionnel)
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") goTo(index - 1);
    if (e.key === "ArrowRight") goTo(index + 1);
  };

  const { img, title, content } = slides[index];

  return (
    <div
      className="slide-mobile"
      role="region"
      aria-label="Slider 3D"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <img src={img} alt={title} draggable={false} />
      <h2>{title}</h2>
      <p>{content}</p>

      <div className="content-indentation" aria-label="Navigation des slides">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`indentation ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Aller à l’image ${i + 1}`}
            aria-pressed={i === index}
          />
        ))}
      </div>
    </div>
  );
}

export default SlideMobile;
