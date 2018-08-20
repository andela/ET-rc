import React from "react";
import CustomButton from "../mixins/buttons";

const RenderShopDetails = ({ shop }) => (
  <div
    style={{
      height: "250px",
      width: "100%",
      display: "flex",
      flexFlow: "column wrap",
      margin: "0 auto",
      justifyContent: "space-evenly",
      alignItems: "center"
    }}
  >
    <p style={{ fontSize: "18px", fontWeight: "700" }}> {  shop ? shop.name : "Test Name" }</p>
    <p style={{ fontSize: "15px" }}> {  shop ? shop.description : "This is a test description"}</p>
    <CustomButton name="View Ratings" />
  </div>
);

export default RenderShopDetails;
