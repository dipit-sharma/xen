import React from "react";
import ConnectionStatus from "./ConnectionStatus";

interface Props {
  title: string;
  status: "connecting" | "open" | "closed" | "error";
}

const AppBar: React.FC<Props> = ({ title, status }) => {
  return (
    <header className="app-bar">
      <div className="app-bar-title">
        <h1>{title}</h1>
      </div>
      <div className="app-bar-status">
        <ConnectionStatus status={status} />
      </div>
    </header>
  );
};

export default AppBar;
