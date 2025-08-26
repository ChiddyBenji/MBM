import { useEffect, useRef, useState } from "react";
import tecrou from "../assets/tecrou.png";


function Step3({ step }) {
  const progress = (step / 3) * 100;
  const pLeftRef = useRef(null);
  const pRightRef = useRef(null);
  const imgRef = useRef(null);

  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeRight, setFadeRight] = useState(false);
  const [fadeUp, setFadeUp] = useState(false);

  useEffect(() => {
    const el = pLeftRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFadeLeft(true);
      },
      { threshold: 0.4 }
    );
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    const el = pRightRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFadeRight(true);
      },
      { threshold: 0.4 }
    );
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    const el = imgRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFadeUp(true);
      },
      { threshold: 0.4 }
    );
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div className="content-call">
      <div className="content-callfirst">
        <div className="txt-firtcall">
          <p ref={pLeftRef} className={fadeLeft ? "fade-left" : ""}>
            Un produit fini,
            <br /> pensé pour durer
          </p>
        </div>
        <div
          className={`img-call ${fadeUp ? "fade-in-section" : ""}`}
          ref={imgRef}
        >
          <img src={tecrou} alt="sphere" />
        </div>
        <div className="txt-secondcall">
          <p ref={pRightRef} className={fadeRight ? "fade-right" : ""}>
            et évoluer dans le temps.
          </p>
        </div>
        <div className="content-push-scroll"></div>
      </div>

      <div className="content-callsecond">
        <div className="one">
          <p>3</p>
        </div>
        <h2>Livraison (Call #3)</h2>
        <p>
          Développement final, tests et mise en ligne <br /> accompagnée.
        </p>
        <div className="scroll-horizon">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default Step3;
