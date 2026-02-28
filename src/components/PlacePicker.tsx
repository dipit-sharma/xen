import * as GMPX from "@googlemaps/extended-component-library/react";
import React, { useEffect, useRef } from "react";

interface PlacePickerProps {
  /**
   * Google Maps API key.  If omitted the component will read from
   * `import.meta.env.VITE_GOOGLE_MAPS_KEY` so you can keep the key in a
   * `.env` file instead of passing it through every caller.
   */
  apiKey?: string;
  placeholder?: string;
  /**
   * Fired when the user picks a place. The detail object is the same
   * object you would get from the Maps Web‑API (including geometry,
   * name, formatted_address, etc.).
   */
  onSelect?: (place: any) => void;
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY as string;

const PlacePicker: React.FC<PlacePickerProps> = ({ placeholder, onSelect }) => {
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  const key = API_KEY;

  if (!key) {
    console.error(
      "PlacePicker: no API key provided; set VITE_GOOGLE_MAPS_KEY or pass apiKey prop",
    );
  }
  const pickerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!pickerRef.current) return;

    const handler = (ev: Event) => {
      const custom = ev as CustomEvent;
      onSelect?.(custom.detail);
    };

    // the event name is documented by Google's extended component library;
    // historically it has been `gmpx-place-picked` (the element fires a
    // CustomEvent with the chosen place in `detail`).
    pickerRef.current.addEventListener(
      "gmpx-place-picked",
      handler as EventListener,
    );

    return () => {
      pickerRef.current?.removeEventListener(
        "gmpx-place-picked",
        handler as EventListener,
      );
    };
  }, [onSelect]);

  return (
    <>
      {/* loader must appear once in the tree and is responsible for
          requesting the Google Maps JS bundle.  You can move this to
          App.tsx if you prefer. */}
      <GMPX.APILoader apiKey={key} />

      <div id="place-picker-box">
        <div id="place-picker-container">
          <GMPX.PlacePicker
            placeholder={placeholder}
            onPlaceChange={(e) => {
              // onSelect(e.target.value);
              onSelect?.(e.target.value);
              setSelectedPlace(e.target.value);
            }}
          />
          <GMPX.PlaceOverview
            size="large"
            place={selectedPlace}
            googleLogoAlreadyDisplayed
          >
            <GMPX.IconButton slot="action" variant="filled">
              See Reviews
            </GMPX.IconButton>
            <GMPX.PlaceDirectionsButton slot="action" variant="filled">
              Directions
            </GMPX.PlaceDirectionsButton>
          </GMPX.PlaceOverview>
        </div>
      </div>
    </>
  );
};

export default PlacePicker;
