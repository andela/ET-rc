import React from "react";

/**
 * Render advantage of the application
 *
 * @returns {JSX}
 */
const RenderAdvantageOfApplication = () => (
  <div style={{
    height: "80px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    flexWrap: "no-wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: "70px"
  }}
  >
    <p style={{ width: "25%" }}> AWESOME DEALS </p>
    <p style={{ width: "25%" }} > QUICK DELIVERY </p>
    <p style={{ width: "25%" }} > SPECIALLY FOR YOU </p>
  </div>
);

export default RenderAdvantageOfApplication;
