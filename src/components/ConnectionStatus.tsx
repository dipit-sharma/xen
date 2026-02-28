import React from "react";

interface Props {
  status: "connecting" | "open" | "closed" | "error";
}

const ConnectionStatus: React.FC<Props> = ({ status }) => {
  let color = "#999";
  switch (status) {
    case "connecting":
      color = "orange";
      break;
    case "open":
      color = "green";
      break;
    case "closed":
      color = "red";
      break;
    case "error":
      color = "darkred";
      break;
  }
  return (
    <div className="connection-status" style={{ color }}>
      {status}
    </div>
  );
};

export default ConnectionStatus;
