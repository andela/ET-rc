import React from "react";
import { Router } from "/client/api";

const ShopCollectionsLandingGrid  = () => (
  <div
    style={{
      display: "flex",
      height: "100%",
      marginTop: "5px",
      width: "70%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly"
    }}
  >
    {/* first side of shop by collections grid */}
    <div
      className="entry-div"
      style={{
        width: "35%",
        position: "relative",
        marginRight: "3px"
      }}
      onClick={() => { Router.go("/tag/shop"); }}
    >
      { /* Image and overlay */}
      <div style={{
        height: "80%",
        width: "100%",
        position: "relative"
      }}
      >
        <img style={{
          height: "100%",
          width: "100%",
          objectFit: "cover"
        }}
        src="/resources/image-one.jpeg"
        />
        <div
          className="product-view-overlay"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "#11111050",
            alignItems: "center",
            justifyContent: "center",
            display: "none",
            zIndex: 3
          }}
        >
          <h3 style={{ color: "white", fontWeight: "bold", fontSize: "24px" }}> Explore different gadgets </h3>
        </div>
      </div>
      { /* end of image and overlay */}
      { /* Beginning of text */}
      <div style={{
        height: "20%",
        width: "100%",
        paddingTop: "5%"
      }}
      >
        <p style={{
          marginBottom: "5px",
          fontSize: "17px",
          fontWeight: "bold",
          color: "#333"
        }}
        > Shop Phones & Tablets </p>
        <p style={{
          fontSize: "13px",
          color: "#464645",
          width: "100%"
        }}
        > Enjoy our special curation of phones and tabs for you,
              ranging from the iPhone X, One Plus 6, The iPad Pro and many more
        </p>
      </div>

    </div>
    { /* second side of the grid */}
    <div
      className="entry-div"
      style={{
        width: "35%",
        position: "relative",
        marginRight: "3px"
      }}
      onClick={() => { Router.go("/tag/shop"); }}
    >
      { /* Image and overlay */}
      <div style={{
        height: "80%",
        width: "100%",
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
        <div
          className="product-view-overlay"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "#11111050",
            alignItems: "center",
            display: "none",
            justifyContent: "center",
            zIndex: 3
          }}
        >
          <h3 style={{ color: "white", fontWeight: "bold", fontSize: "24px" }}> Explore different gadgets </h3>
        </div>
      </div>
      { /* end of image and overlay */}
      { /* Beginning of text */}
      <div style={{
        height: "20%",
        width: "100%",
        paddingTop: "5%"
      }}
      >
        <p style={{
          marginBottom: "5px",
          fontSize: "17px",
          fontWeight: "bold",
          color: "#333"
        }}
        > Shop Drones and VR Headsets </p>
        <p style={{
          fontSize: "13px",
          color: "#464645",
          width: "100%"
        }}
        > Enjoy our special curation of phones and tabs for you,
              ranging from the iPhone X, One Plus 6, The iPad Pro and many more
        </p>
      </div>

    </div>
  </div>
);

export default ShopCollectionsLandingGrid;
