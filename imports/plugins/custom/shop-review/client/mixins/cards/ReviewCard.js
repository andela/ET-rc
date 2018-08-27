import React from "react";
import Stars from "react-stars";

const ReviewCard = ({ review }) => (
  <div
    style={{
      height: "100px",
      width: "100%",
      paddingLeft: "15px",
      paddingTop: "10px",
      paddingBottom: "10px",
      paddingRight: "10px",
      backgroundColor: "#F2F3F4",
      marginBottom: "3px",
      borderBottom: "0.5px solid #CACFD280"
    }}>
    <p 
      style={{
        fontSize: "15px",
        fontWeight: "bold",
        marginBottom: "10px",
        color: "#6C3483"
      }}> { review.username } </p>
    { review.review && (
      <p
        style={{
          fontSize: "14px"
        }}
      >{review.review}</p>
    )}
    <div>
      <Stars
        count={5}
        size={15}
        value={review.rating}
        edit={false}
      />
    </div>
  </div>
);

export default ReviewCard;