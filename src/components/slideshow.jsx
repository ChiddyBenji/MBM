import { useState, useRef, useEffect } from "react";
import three from "../assets/three.jpg";
import sugar from "../assets/sugar.png";
import echec from "../assets/echec.png";

const slideshowData = [
  {
    img: echec,
    title: "Mates - Stainless steel",
    description:
      "Founded in 2025, Mate embodies artisanal excellence. Each piece of their stainless steel chess set is crafted by master artisans passionate about the art of chess.",
  },
  {
    img: three,
    title: "Art of Photography",
    description:
      "Explore the world of photography through the lens of professional photographers, capturing moments that define creativity.",
  },
  {
    img: sugar,
    title: "Luxury Furniture",
    description:
      "A perfect blend of craftsmanship and elegance, our luxury furniture line is designed for those who appreciate quality and comfort.",
  },
];

function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragStartX = useRef(null);
  const txtRef = useRef(null);
  const slideRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slideshowData.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slideshowData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (dragStartX.current !== null) {
      const deltaX = e.clientX - dragStartX.current;
      if (deltaX > 50) {
        prevSlide();
        dragStartX.current = null;
      } else if (deltaX < -50) {
        nextSlide();
        dragStartX.current = null;
      }
    }
  };

  const handleMouseUp = () => {
    dragStartX.current = null;
  };

  const handleTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (dragStartX.current !== null) {
      const deltaX = e.touches[0].clientX - dragStartX.current;
      if (deltaX > 50) {
        prevSlide();
        dragStartX.current = null;
      } else if (deltaX < -50) {
        nextSlide();
        dragStartX.current = null;
      }
    }
  };

  const handleTouchEnd = () => {
    dragStartX.current = null;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    const element = txtRef.current;
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="what">
      <div className="content-slideshow">
        <div
          ref={txtRef}
          className={`content-txt-slideshow ${visible ? "fade-left" : ""}`}
        >
          <div className="content-para-slideshow">
            <h2>Des structures solides, habillées avec intention.</h2>
            <p>Explorez nos réalisations — où chaque interaction a un but.</p>
          </div>
        </div>

        <div
          ref={slideRef}
          className={`slideshow ${visible ? "fade-right" : ""}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="content-cards-slideshow">
            {slideshowData.map((item, index) => {
              const position =
                index === currentIndex
                  ? "active"
                  : index === (currentIndex + 1) % slideshowData.length
                  ? "next"
                  : index ===
                    (currentIndex - 1 + slideshowData.length) %
                      slideshowData.length
                  ? "prev"
                  : "";

              return (
                <div
                  key={index}
                  className={`slide ${position}`}
                  onClick={() => {
                    if (position === "next") {
                      nextSlide();
                    } else if (position === "prev") {
                      prevSlide();
                    }
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="slide-img"
                  />
                  <div className="slide-text">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="content-indentation">
            {slideshowData.map((_, index) => (
              <div
                key={index}
                className={`indentation ${
                  index === currentIndex ? "active" : ""
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Slideshow;
