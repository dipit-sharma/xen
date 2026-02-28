import React from "react";
import type { RouteResponse } from "../types/navigation";

interface Props {
  route: RouteResponse;
  currentStep: number;
  onNext: () => void;
  onStop: () => void;
}

const NavigationControls: React.FC<Props> = ({
  route,
  currentStep,
  onNext,
  onStop,
}) => {
  const step = route.steps[currentStep];
  const distKm = (step.distance / 1000).toFixed(1);
  const durMin = Math.ceil(step.duration / 60);

  return (
    <div className="navigation-controls">
      <h3>
        Step {currentStep + 1} of {route.steps.length}
      </h3>
      {step.normalized && <p>{step.normalized}</p>}
      <p>
        <span role="img" aria-label="distance">📏</span> {distKm} km,&nbsp;
        <span role="img" aria-label="duration">⏱️</span> {durMin} min
      </p>
      <button onClick={onNext} disabled={currentStep >= route.steps.length - 1}>
        Next
      </button>
      <button onClick={onStop} className="stop-btn">
        Stop
      </button>
    </div>
  );
};

export default NavigationControls;
