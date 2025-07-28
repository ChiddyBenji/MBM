import { useEffect, useRef, useState } from "react";
import call from "../assets/call.png";
import ecrou from "../assets/ecrou.png";

function Call({ step }) {
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
    <section id="plans">
      <div className="content-call">
        <div className="content-callfirst">
          <div className="txt-firtcall">
            <p ref={pLeftRef} className={fadeLeft ? "fade-left" : ""}>
              Un parcours clair,
              <br />
              de l'idée
            </p>
          </div>

          <div
            className={`img-call ${fadeUp ? "fade-in-section" : ""}`}
            ref={imgRef}
          >
            <img src={call} alt="smartphone" />
          </div>

          <div className="txt-secondcall">
            <p ref={pRightRef} className={fadeRight ? "fade-right" : ""}>
              à la mise en ligne.
            </p>
          </div>

          <div className="content-push-scroll">
            <img src={ecrou} alt="scroll icon" />
          </div>
        </div>

        <div className="content-callsecond">
          <div className="one">
            <p>1</p>
          </div>
          <h2>Exploration (Call #1)</h2>
          <p>
            Écoute active → définition de vos objectifs et <br /> contraintes
            techniques.
          </p>
          <div className="scroll-horizon">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Call;
