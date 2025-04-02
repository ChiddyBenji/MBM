import React, { useRef, useEffect, useState } from "react";
import webflow from "../assets/webflow.png";
import zed from "../assets/zed.png";
import wix from "../assets/wix.png";
import shophify from "../assets/shophify.png";
import wordpress from "../assets/wordpress.png";
import fox from "../assets/fox.jpg";
import cat from "../assets/cat.jpg";
import dog from "../assets/dog.jpg";

function Template() {
  const circleRefs = useRef([]);
  const [angle, setAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = [
    { src: fox, alt: "Image 1" },
    { src: cat, alt: "Image 2" },
    { src: dog, alt: "Image 3" },
    { src: fox, alt: "Image 4" },
    { src: cat, alt: "Image 5" },
    { src: dog, alt: "Image 6" },
  ];

  const iconTemplate = [
    { src: webflow, alt: "Image 1" },
    { src: zed, alt: "Image 2" },
    { src: wix, alt: "Image 3" },
    { src: shophify, alt: "Image 4" },
    { src: wordpress, alt: "Image 5" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovered) {
        setAngle((prev) => (prev + 1) % 360);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const radius = 375;
    circleRefs.current.forEach((circle, index) => {
      if (!circle) return;

      const itemAngle = angle + index * (360 / images.length);
      const radians = (itemAngle * Math.PI) / 180;
      const x = radius * Math.cos(radians);
      const y = radius * Math.sin(radians);

      circle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  }, [angle, images.length]);

  return (
    <div className="content-templates">
      <div
        className="circle-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p className="blueprint-text">
          Des blueprints web Intemporels, <br /> prêts à l’emploi.
        </p>
        <p className="txt-icon-template">disponible sur</p>
        <div className="content-icon-template">
          {iconTemplate.map((icon, index) => (
            <img
              key={index}
              src={icon.src}
              alt={icon.alt}
              className="icon-item"
            />
          ))}
        </div>
        <button className="center-button">Découvrez nos templates</button>

        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className="circle-item"
            ref={(el) => (circleRefs.current[index] = el)}
            onMouseEnter={() => setIsHovered(false)}
            onMouseLeave={() => setIsHovered(true)}
          />
        ))}
      </div>
    </div>
  );
}

export default Template;
