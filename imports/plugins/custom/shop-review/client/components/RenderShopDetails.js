import React from "react";
import CustomButton from "../mixins/buttons";
import Stars from "react-stars";

const RenderShopDetails = ({ shop, renderModal, shopRating }) => (
  <div
    style={{
      height: "150px",
      width: "100%",
      paddingTop: "15px",
      display: "flex",
      flexFlow: "column wrap",
      margin: "0 auto",
      justifyContent: "space-evenly",
      alignItems: "center"
    }}
  >
    <p style={{ fontSize: "18px", fontWeight: "700" }}> {  shop ? shop.name : "Test Name" }</p>
    <p style={{ fontSize: "15px" }}> {  shop ? shop.description : "This is a test description"}</p>
    <div
      style={{
        height: "20px",
        width: "100%",
        display: "flex",
        zIndex: 0,
        flexDirections: "row",
        justifyContent: "center"

      }}
    >
      <Stars
        count={5}
        value={shopRating}
        edit={false}
      />
      <p style={{ color: "#BDC3C7", fontSize: "15px", fontWeight: "700", marginLeft: "12px" }}>{Number.parseFloat(shopRating).toPrecision(3)}</p>

    </div>
    <CustomButton
      name="Rate Shop"
      handleClick={renderModal}
      style={{
        position: "relative",
        width: "150px",
        backgroundColor: "white",
        borderRadius: "0px",
        borderColor: "white",
        color: "#6C3483",
        height: "40px",
        boxShadow: "1px 1px 5px 1px #E5E7E9"
      }}
    />
  </div>
);

export default RenderShopDetails;
