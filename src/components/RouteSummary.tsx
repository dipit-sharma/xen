import React from "react";
import type { RouteResponse } from "../types/navigation";
import { metersToKilometers, calculateETA } from "../utils/normalize";

interface Props {
  route: RouteResponse;
}

const RouteSummary: React.FC<Props> = ({ route }) => {
  return (
    <div className="route-summary">
      <p>{route.summary}</p>
      <p>Distance: {metersToKilometers(route.distance).toFixed(1)} km</p>
      <p>ETA: {calculateETA(route.duration)}</p>
    </div>
  );
};

export default RouteSummary;
