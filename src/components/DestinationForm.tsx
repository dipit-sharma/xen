import React, { useState } from "react";

interface Props {
  onSubmit: (destination: string) => void;
  disabled?: boolean;
}

const DestinationForm: React.FC<Props> = ({ onSubmit, disabled }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="destination-form">
      <input
        type="text"
        placeholder="Enter destination"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !input.trim()}>
        Start
      </button>
    </form>
  );
};

export default DestinationForm;
