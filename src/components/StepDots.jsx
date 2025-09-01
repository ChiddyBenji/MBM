// components/StepDots.jsx
export default function StepDots({ total = 3, active = 1, clickable = false, onChange }) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="content-indentation" role="tablist" aria-label="Étapes">
      {steps.map((n) => (
        <button
          key={n}
          type="button"
          className={`indentation ${n === active ? "active" : ""}`}
          aria-label={`Étape ${n}`}
          aria-pressed={n === active}
          onClick={clickable && onChange ? () => onChange(n) : undefined}
          disabled={!clickable}
        />
      ))}
    </div>
  );
}
