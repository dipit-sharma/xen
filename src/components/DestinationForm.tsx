/// <reference path="../global.d.ts" />
import React from "react";
import PlacePicker from "./PlacePicker";

interface Props {
  onSubmit: (destination: string) => void;
  disabled?: boolean;
}

const DestinationForm: React.FC<Props> = ({ onSubmit, disabled }) => {
  return (
    <div className="destination-form">
      {/* the place picker replaces the text input completely */}

      <PlacePicker
        placeholder="Enter an address"
        onSelect={(place) => {
          const dest = place.formatted_address ?? place.name ?? "";
          if (dest) onSubmit(dest);
        }}
      />
    </div>
  );
};

export default DestinationForm;
