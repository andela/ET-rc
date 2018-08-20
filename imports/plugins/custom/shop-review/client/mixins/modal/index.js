import React from "react";

const RenderModal = ({ children }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      height: "100%",
      width: "100%",
      backgroundColor: "#14141460",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    { children }
  </div>
);

export {
  RenderModal
};
