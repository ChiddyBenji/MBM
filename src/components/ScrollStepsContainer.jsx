import { useEffect, useRef, useState, useCallback } from "react";
import Call from "./call";
import Step2 from "./Step2";
import Step3 from "./Step3";

function ScrollStepsContainer() {
  const MAX_STEP = 3;
  const [step, setStep] = useState(1);

  const wrapperRef = useRef(null);
  const isAnimating = useRef(false);
  const scrollLocked = useRef(false);
  const lastWheelTs = useRef(0);

  // ─────────────────────────────────────────
  // Desktop : wheel → change de step si geste net
  // ─────────────────────────────────────────
  const handleWheel = useCallback(
    (e) => {
      if (!scrollLocked.current || isAnimating.current) return;

      const now = Date.now();
      if (now - lastWheelTs.current < 320) return; // anti-spam

      const dy = e.deltaY;
      const THRESHOLD = 40; // ignore micro-mouvements
      let changed = false;

      if (dy > THRESHOLD && step < MAX_STEP) {
        setStep((s) => s + 1);
        changed = true;
      } else if (dy < -THRESHOLD && step > 1) {
        setStep((s) => s - 1);
        changed = true;
      }

      // On bloque le scroll vertical SEULEMENT si on change d'étape
      if (changed) {
        e.preventDefault();
        lastWheelTs.current = now;
        isAnimating.current = true;
        setTimeout(() => (isAnimating.current = false), 300);
      }
    },
    [step]
  );

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scrollLocked.current = true;
          // Attacher le wheel sur window (passive:false requis pour preventDefault)
          window.addEventListener("wheel", handleWheel, { passive: false });
        } else {
          scrollLocked.current = false;
          window.removeEventListener("wheel", handleWheel);
        }
      },
      { threshold: 0.4 } // seuil un peu plus permissif
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // ─────────────────────────────────────────
  // Mobile : swipe horizontal (touch events)
  // ─────────────────────────────────────────
  const touch = useRef({ x: 0, y: 0, active: false, axis: null });

  const onTouchStart = (e) => {
    if (!scrollLocked.current) return; // on n'active que dans la zone visible
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, active: true, axis: null };
  };

  const onTouchMove = (e) => {
    if (!touch.current.active) return;
    const t = e.touches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;

    if (touch.current.axis == null) {
      if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
        touch.current.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
    }

    // Si on a détecté un geste horizontal, on prend la main (pour éviter le scroll vertical parasite)
    if (touch.current.axis === "x") {
      e.preventDefault();
    }
  };

  const onTouchEnd = (e) => {
    if (!touch.current.active) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const THRESHOLD = 50;

    if (touch.current.axis === "x" && Math.abs(dx) >= THRESHOLD) {
      if (dx < 0 && step < MAX_STEP) setStep((s) => s + 1); // swipe gauche
      else if (dx > 0 && step > 1) setStep((s) => s - 1);  // swipe droite
    }

    touch.current.active = false;
    touch.current.axis = null;
  };

  // Reset externe (inchangé)
  useEffect(() => {
    const handleResetStep = (e) => {
      setStep(1);
      setTimeout(() => {
        const section = document.getElementById(e.detail);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 10);
    };
    window.addEventListener("resetStepToOne", handleResetStep);
    return () => window.removeEventListener("resetStepToOne", handleResetStep);
  }, []);

  const CurrentStep = step === 1 ? Call : step === 2 ? Step2 : Step3;

  return (
    <div
      ref={wrapperRef}
      className="scroll-steps-wrapper"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <CurrentStep step={step} />
    </div>
  );
}

export default ScrollStepsContainer;
