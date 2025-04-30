import React from "react";

export default function Status({ themeColour, message }) {
  return (
    <div
      style={{
        color: "white",
        textAlign: "center",
        borderRadius: "5px",
        background: themeColour,
      }}
    >
      {message}
    </div>
  );
}
