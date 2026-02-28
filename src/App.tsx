import { useState } from "react";
import "./App.css";

import AppBar from "./components/AppBar";
import NavigationControls from "./components/NavigationControls";
import PlacePicker from "./components/PlacePicker";
import RouteSummary from "./components/RouteSummary";
import { getCurrentCoordinates } from "./hooks/useCorrdinates";
import { useNavigation } from "./hooks/useNavigation";
import { fetchRoute } from "./services/api";
import type { RouteResponse } from "./types/navigation";

function App() {
  const {
    route,
    currentStep,
    status,
    startNavigation,
    stopNavigation,
    nextStep,
    sessionId,
  } = useNavigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDestination = async (dest: string) => {
    setError(null);
    setLoading(true);

    const coordinates = await getCurrentCoordinates().catch((err) => {
      console.error("Error getting current coordinates:", err);
      setError("Unable to get current location");
      setLoading(false);
    });

    try {
      if (!coordinates) {
        throw new Error("Location not available");
      }
      const data: RouteResponse = await fetchRoute(
        dest,
        `${coordinates.latitude},${coordinates.longitude}`,
        sessionId,
      );
      startNavigation(data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AppBar title="Xen Navigation" status={status} />
      <div className="app-container">
        <main>
          {!route && (
            <>
              <PlacePicker onSelect={handleDestination} />
            </>
          )}
          {loading && <p>Loading route...</p>}
          {error && <p className="error">{error}</p>}
          {route && <RouteSummary route={route} />}
          {route && (
            <NavigationControls
              route={route}
              currentStep={currentStep}
              onNext={nextStep}
              onStop={stopNavigation}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
