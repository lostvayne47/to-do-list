import React from "react";

export default function Status({ themeColour, message }) {
  return (
    <div
      style={{
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        borderRadius: "5px",
        background: themeColour,
      }}
    >
      {message}
    </div>
  );
}
