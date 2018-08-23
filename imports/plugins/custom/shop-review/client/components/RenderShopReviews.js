import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import PropTypes from "prop-types";
import ReviewCard from "../mixins/cards/ReviewCard";
import ReviewForm from "../mixins/forms/ReviewForm";

export default class ShopReviewsList extends Component {
        static propTypes = {
          reviews: PropTypes.array.isRequired
        }
        constructor(props) {
          super(props);
          // constructor here for readability purposes
          this.state = {
            currentRating: 0,
            content: ""
          };
        }

    changeRating = (value) => this.setState({ currentRating: value });

    handleChange = (e) => this.setState({ content: e.target.value });


    handleClick = () => {
    // make the call
      const { content, currentRating } = this.state;
      if (!content.length || currentRating < 1) return;
      const user = Meteor.user();
      if (!user) return; // do nothing if there is no current user, this is unlikely to happen
      const reviewObject = {
        username: user.username || "anonymous",
        rating: Math.floor(currentRating),
        review: content,
        type: 2,
        userId: Meteor.userId(),
        destination: Reaction.Router.getParam("id")
      };
      Meteor.call("create.review", reviewObject);
      this.setState({ content: "", currentRating: 0 });
    }
    renderItems = () => this.props.reviews.map(reviewObject => <ReviewCard key={`item-${reviewObject._id}`} review={reviewObject}/>)

    render = () => {
      const { currentRating, content } = this.state;
      return (
        <div
          style={{
            height: "70%",
            zIndex: 2,
            width: "40%",
            borderRadius: "5px",
            paddingTop: "20px",
            backgroundColor: "white"
          }}
        >
          <ReviewForm
            currentRating={currentRating}
            handleClick={this.handleClick}
            changeRating={this.changeRating}
            handleChange={this.handleChange}
            value={content}
          />
          <div
            style={{
              height: "55%",
              width: "100%",
              backgroundColor: "#F2F3F4",
              overflowY: "scroll",
              marginTop: "10px"
            }}
          >
            { this.props.reviews.length ?  this.renderItems() : <p style={{ fontSize: "18px", marginTop: "20px", textAlign: "center", position: "relative", bottom: "-100px", fontWeight: "bold", color: "#CACFD2" }}> Seems like there are no reviews </p> }
          </div>
        </div>
      );
    }
}

