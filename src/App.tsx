import { useState } from "react";
import "./App.css";

import DestinationForm from "./components/DestinationForm";
import RouteSummary from "./components/RouteSummary";
import NavigationControls from "./components/NavigationControls";
import AppBar from "./components/AppBar";
import { fetchRoute } from "./services/api";
import { useNavigation } from "./hooks/useNavigation";
import type { RouteResponse } from "./types/navigation";
import PlacePicker from "./components/PlacePicker";

function App() {
  const {
    route,
    currentStep,
    status,
    startNavigation,
    stopNavigation,
    nextStep,
  } = useNavigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDestination = async (dest: string) => {
    setError(null);
    setLoading(true);

    try {
      const data: RouteResponse = await fetchRoute(
        dest,
        "12.9692833,77.6967168",
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
