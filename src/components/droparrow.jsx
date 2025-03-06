import { useState, useEffect, useCallback } from "react";
import "../styles/App.scss";
import droparrow from "../assets/arrow.png";

function DropArrow() {
  const [showArrow, setShowArrow] = useState(false);

  const handleScroll = useCallback(() => {
    setShowArrow(window.scrollY > 200);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="content-drop-arrow">
      <div
        className={`drop-arrow ${showArrow ? "visible" : "hidden"}`}
        onClick={scrollToTop}
      >
        <img src={droparrow} alt="Flèche vers le haut" />
      </div>
    </div>
  );
}

export default DropArrow;
