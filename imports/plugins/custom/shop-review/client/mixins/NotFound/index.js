import React from "react";

const NotFoundComponent = () => (
  <div
    style={{
      display: "flex",
      height: "500px",
      width: "100%",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <p
      style={{
        color: "#E5E7E9",
        fontWeight: "bold",
        fontSize: "18px"
      }}
    > No shop found matching that criteria </p>
  </div>
);

export default NotFoundComponent;
