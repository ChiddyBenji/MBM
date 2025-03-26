import "../styles/App.scss";
import { useState, useEffect } from "react";
import fox from "../assets/fox.jpg";
import cat from "../assets/cat.jpg";
import dog from "../assets/dog.jpg";

const slideshowData = [
  {
    img: dog,
    title: "Mates - Stainless steel",
    description:
      "Founded in 2025, Mate embodies artisanal excellence. Each piece of their stainless steel chess set is crafted by master artisans passionate about the art of chess.",
  },
  {
    img: fox,
    title: "Art of Photography",
    description:
      "Explore the world of photography through the lens of professional photographers, capturing moments that define creativity.",
  },
  {
    img: cat,
    title: "Luxury Furniture",
    description:
      "A perfect blend of craftsmanship and elegance, our luxury furniture line is designed for those who appreciate quality and comfort.",
  },
];

function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideshowData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="content-slideshow">
      <div className="content-txt-slideshow">
        <div className="content-para-slideshow">
          <h2>Des structures solides, habillées avec intention.</h2>
          <p>Explorez nos réalisations — où chaque interaction a un but.</p>
        </div>
      </div>

      <div className="slideshow">
        <div className="content-cards-slideshow">
          <img
            src={slideshowData[currentIndex].img}
            alt="Slideshow"
            className="img-slideshow"
          />
          <h2>{slideshowData[currentIndex].title}</h2>
          <p>{slideshowData[currentIndex].description}</p>
        </div>

        <div className="content-indentation">
          <div className="identation"></div>
        </div>
      </div>
    </div>
  );
}

export default Slideshow;
