import React, { useRef, useEffect, useState } from 'react';

function Template() {
  const circleRefs = useRef([]);
  const [angle, setAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = [
    { src: "image1.jpg", alt: "Image 1" },
    { src: "image2.jpg", alt: "Image 2" },
    { src: "image3.jpg", alt: "Image 3" },
    { src: "image4.jpg", alt: "Image 4" },
    { src: "image5.jpg", alt: "Image 5" },
    { src: "image6.jpg", alt: "Image 6" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovered) {
        setAngle(prev => (prev + 1) % 360);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const radius = 350;
    circleRefs.current.forEach((circle, index) => {
      if (!circle) return;

      const itemAngle = angle + (index * (360 / images.length)); 
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
        <button className="center-button">
          {isHovered ? "✨ Tourne !" : "☝️ Survole-moi"}
        </button>
        
        {images.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={img.alt}
            className="circle-item"
            ref={el => circleRefs.current[index] = el}
          />
        ))}
      </div>
    </div>
  );
}

export default Template;