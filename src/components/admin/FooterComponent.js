import React from "react";

export default function FooterComponent() {
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "15px",
        fontWeight: "bold",
      }}
    >
      &copy; {new Date().getFullYear()} Copyright: Admin website SkinLeLe
    </div>
  );
}
