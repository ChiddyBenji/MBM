import { useEffect } from "react"; // ← ajoute ceci
import { Routes, Route } from "react-router-dom";
import "../styles/App.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import DropArrow from "../components/droparrow";
import Front from "../components/front";
import Description from "../components/description";
import Slideshow from "../components/slideshow";
import Template from "../components/templates";
import Form from "../components/Form";
import ScrollStepsContainer from "../components/ScrollStepsContainer";

function App() {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const updatePosition = () => {
      // Interpolation douce
      currentX += (mouseX - currentX) * 1.5;
      currentY += (mouseY - currentY) * 1.5;
      cursor.style.transform = `translate(${currentX - 5}px, ${
        currentY - 5
      }px)`;
      requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleHover = (e) => {
      const target = e.target;

      if (
        target.closest("a, button, [role='button'], [onclick], .clickable") ||
        target.tagName === "IMG"
      ) {
        cursor.classList.add("hover");
      } else {
        cursor.classList.remove("hover");
      }

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
      ) {
        cursor.classList.add("text");
      } else {
        cursor.classList.remove("text");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleHover);
    requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleHover);
      cursor.remove();
    };
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Front />
              <Description />
              <Slideshow />
              <Template />
              <ScrollStepsContainer />
              <Form />
            </>
          }
        />
      </Routes>
      <Footer />
      <DropArrow />
    </>
  );
}

export default App;
