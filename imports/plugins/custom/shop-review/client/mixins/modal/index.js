import React from "react";

const RenderModal = ({ children, closeModal }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <div
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        backgroundColor: "#14141460"
      }}
      onClick={closeModal}
    />
    { children }
  </div>
);

export { RenderModal };
