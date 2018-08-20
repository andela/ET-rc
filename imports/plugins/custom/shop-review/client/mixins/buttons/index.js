import React from "react";

const EtButton = ({ name, style }) => (
  <button
    style={{
      height: "50px",
      width: "190px",
      textAlign: "center",
      backgroundColor: "#7e3794",
      color: "white",
      float: "left",
      marginTop: "30px",
      borderRadius: "3px",
      ...style
    }}
  >
    {name}
  </button>
);

export default EtButton;
