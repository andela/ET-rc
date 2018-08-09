import React from "react";
import { Router } from "/client/api";

const TwoSideGrid =  () => (
  <div
    style={{
      display: "flex",
      height: "350px",
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between" }}
  >
    {/* first grid side */}
    <div
      className="entry-div"
      style={{
        display: "flex",
        flexBasis: "45%",
        flex: 1,
        position: "relative",
        marginRight: "3px"
      }}
      onClick={() => { Router.go("/tag/shop"); }}
    >
      <img style={{
        height: "100%",
        width: "100%",
        objectFit: "cover"
      }}
      src="/resources/image-one.jpeg"
      />
      <div

        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "#11111050",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3
        }}
      >
        <h3 style={{ color: "white", fontWeight: "bold", fontSize: "24px" }}> Explore different gadgets </h3>
      </div>
    </div>
    { /* second side of the grid */}
    <div
      className="entry-div"
      style={{
        display: "flex",
        flexBasis: "45%",
        flex: 1,
        position: "relative"
      }}
    >
      <img style={{
        height: "100%",
        width: "100%",
        objectFit: "cover"
      }}
      src="/resources/image-two.jpeg"
      />
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "#11111050",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 3
      }}
        onClick={() => { Router.go("/tag/shop"); }}
      >
        <h3 style={{ color: "white", fontWeight: "bold", fontSize: "24px" }}> Collections that truly inspire </h3>
      </div>
    </div>
  </div>
);

export default TwoSideGrid;
