import React from "react";
import CustomButton from "../mixins/buttons";
import Stars from "react-stars";

const RenderShopDetails = ({ shop, renderModal, shopRating }) => (
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
    <Stars
      count={5}
      value={shopRating}
      edit={false}
    />
    <CustomButton name="View Ratings" handleClick={renderModal} style={{ margin: 0 }}/>
  </div>
);

export default RenderShopDetails;
