import { useEffect, useRef, useState, useCallback } from "react";
import Call from "./call";
import Step2 from "./Step2";
import Step3 from "./Step3";

function ScrollStepsContainer() {
  const [step, setStep] = useState(1);
  const scrollWrapperRef = useRef(null);
  const isAnimating = useRef(false);
  const scrollLocked = useRef(false);

  const handleScroll = useCallback(
    (e) => {
      if (isAnimating.current || !scrollLocked.current) return;

      e.preventDefault();
      isAnimating.current = true;

      if (e.deltaY > 0 && step < 3) {
        setStep((prev) => prev + 1);
      } else if (e.deltaY < 0 && step > 1) {
        setStep((prev) => prev - 1);
      }

      setTimeout(() => {
        isAnimating.current = false;
      }, 100);
    },
    [step]
  );

  const handleClickBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const section = scrollWrapperRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scrollLocked.current = true;
          window.addEventListener("wheel", handleScroll, { passive: false });
        } else {
          scrollLocked.current = false;
          window.removeEventListener("wheel", handleScroll);
        }
      },
      {
        threshold: 0.75,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", handleScroll);
    };
  }, [handleScroll]);

  const CurrentStep = step === 1 ? Call : step === 2 ? Step2 : Step3;

  return (
    <div ref={scrollWrapperRef} className="scroll-steps-wrapper">
      <CurrentStep step={step} onBack={handleClickBack} />
    </div>
  );
}

export default ScrollStepsContainer;
