import React from "react";
import CustomButton from "../buttons";
import RenderModal from "../modal";

const RenderRatingsAndReviewForm = ({ handleSubmit, shopName }) => {
  const RenderMainForm = (
    <div style={{
      height: "30%",
      width: "60%",
      borderRadius: "5px",
      backgroundColor: "white"
    }}
    >
      { /* This should render the input form */}
      <div style={{
        display: "flex",
        position: "relative",
        flex: 1,
        paddingTop: "20px"
      }}
      >
        <input
          type="text"
          name="input Rating"
          placeholder={`share your rating about ${shopName}`}
          style={{
            height: "70%",
            width: "90%",
            borderRadius: "3px",
            borderWidth: "1px",
            borderColor: "#BFBDBD"
          }}
        />
        <CustomButton
          name="Submit"
          style={{
            position: "relative",
            bottom: "5px",
            right: "10px"
          }}
          onClick={handleSubmit}
        />
      </div>

    </div>
  );
  return (
    <RenderModal>
      <RenderMainForm />
    </RenderModal>
  );
};

export default RenderRatingsAndReviewForm;
