import React from "react";
import Stars from "react-stars";
import CustomButton from "../buttons/";

const ReviewForm = ({ currentRating, changeRating, handleClick, handleChange, value }) => (
  <div
    style={{
      height: "250px",
      width: "80%",
      paddingBottom: "10px",
      paddingTop: "10px",
      paddingRight: "10px",
      paddingLeft: "20px"
    }}
  >
    <textarea
      style={{
        height: "120px",
        position: "relative",
        left: "10%",
        zIndex: 10000,
        width: "100%",
        borderColor: "#BDC3C7",
        borderRadius: "3px",
        borderWidth: "0.5px",
        color: "#626567",
        marginBottom: "10px"
      }}
      value={value}
      onChange={handleChange}
    />
    <div
      style={{
        height: "60px",
        width: "100%",
        position: "relative",
        right: "-9%"
      }}
    >
      <p style={{ marginBottom: "5px" }}> Give a rating </p>
      <Stars
        count={5}
        size={20}
        value={currentRating}
        edit
        onChange={changeRating}
      />
    </div>
    <CustomButton
      name="Submit"
      handleClick={handleClick}
      style={{
          height: "40px",
          width: "120px",
          margin: 0,
          position: "relative",
          right: "-9%"
      }}
    />
  </div>
);

export default ReviewForm;
