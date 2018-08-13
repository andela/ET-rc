import React from "react";

/**
 * Renders a section above the grid
 *
 * @returns {JSX}
 */
const AlwaysBeenAboutYou = () => (
  <div
    style={{
      height: "60%",
      width: "30%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}
  >
    <p
      style={{
        maxWidth: "60px",
        fontSize: "12px",
        textTransform: "uppercase",
        color: "#A569BD", // changed to colour purple
        marginBottom: "20px",
        float: "left",
        paddingLeft: "20px"
      }}
    >
      #FORTHELOVEOFGADGETS
    </p>
    <div
      style={{
        height: "60%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "10%"
      }}
    >
      { /* The Large it's always been about you  text */}
      <p
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          color: "#333",
          width: "70%",
          textAlign: "center",
          marginBottom: "15px"
        }}
      >
        {"IT'S ALWAYS BEEN ABOUT YOU"}
      </p>
      { /* */}
      <p
        style={{
          minWidth: "100px",
          fontSize: "13px",
          color: "#464645",
          width: "80%"
        }}
      >
        Why do we do what we do? Why do we curate the best electronic gadgets
        across the globe to serve on a plate to you? Because we believe human experience
        is made significantly better with these awesome gadgets, so, why not?
        Shop ET World. Experience different
      </p>
      <div
        style={{
          height: "80px",
          width: "180px",
          textAlign: "center",
          paddingTop: "8px",
          backgroundColor: "#8E44AD",
          color: "white",
          float: "left",
          marginTop: "30px"
        }}
        className="explore-button-landing"
      >
        <p style={{ fontSize: "14px", fontWeight: "bold", width: "100%" }}> Explore Collections </p>
      </div>
    </div>
  </div>
);

export default AlwaysBeenAboutYou;
