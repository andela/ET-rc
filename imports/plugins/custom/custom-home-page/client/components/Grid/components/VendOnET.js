import React from "react";

/**
 * Renders a component to setup shop
 *
 * @returns {JSX}
 */
const VendOnETWorld = () => (
  <div
    style={{
      minHeight: "250px",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap"
    }}
  >
    <img
      src="/resources/open-shop.jpeg"
      style={{
        objectFit: "cover",
        height: "100%",
        flexBasis: "50%",
        width: "50%"
      }}
      alt="open-shop-with-et-world"
    />
    <div style={{
      width: "50%",
      flexBasis: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}
    >
      <p
        style={{
          fontSize: "28px",
          color: "#3B3B3A",
          fontWeight: "600"
        }}
      >
        Set up a shop on ET world
      </p>
      <p
        style={{
          fontSize: "13px",
          color: "#A6ACAF",
          textAlign: "center",
          maxWidth: "70%"
        }}
      >
        ET world is the best place to host your products,
        we have a track record of pushing almost unfathomed traffic towards
        vendors and products of our site
      </p>
      <button
        style={{
          height: "50px",
          width: "190px",
          textAlign: "center",
          backgroundColor: "#7e3794",
          color: "white",
          float: "left",
          marginTop: "30px",
          borderRadius: "3px"
        }}
      >
        Set up your store
      </button>

    </div>
  </div>
);

export default VendOnETWorld;
