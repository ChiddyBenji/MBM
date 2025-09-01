import { useEffect, useRef, useState } from "react";
import ecrou from "../assets/ecrou.png";
import holo from "../assets/holo.png";
import StepDots from "../components/StepDots";

function Step2({ step }) {
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
            Une vision structurée,
            <br /> du design
          </p>
        </div>
        <div
          className={`img-call ${fadeUp ? "fade-in-section" : ""}`}
          ref={imgRef}
        >
          <img src={holo} alt="holographique" />
        </div>
        <div className="txt-secondcall">
          <p ref={pRightRef} className={fadeRight ? "fade-right" : ""}>
            à la maquette interactive.
          </p>
        </div>
        <div className="content-push-scroll">
          <img src={ecrou} alt="scroll icon" />
        </div>
      </div>

      <div className="content-callsecond">
        <div className="one">
          <p>2</p>
        </div>
        <h2>Conception (Call #2)</h2>
        <p>
          Wireframes, maquettes UI et logique utilisateur <br /> pour vos
          futures interfaces.
        </p>
        <div className="scroll-horizon">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <StepDots total={3} active={Math.min(Math.max(step, 1), 3)} />
      </div>
    </div>
  );
}

export default Step2;
