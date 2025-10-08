import React, { useRef } from "react";

function Footer() {
  const containerRef = useRef(null);
  const footerText = "MB Studio — Architectes du web depuis 2025";
  const logoRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    logoRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    logoRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <footer className="footer">
      <div className="content-logo-footer">
        <div
          className="content-img-logo-footer"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="logo-3d" ref={logoRef}>
            <img src="/big-logo.png" alt="Logo MB Studio" className="logo-footer" />
          </div>
        </div>

        <p>{footerText}</p>
      </div>
    </footer>
  );
}

export default Footer;
