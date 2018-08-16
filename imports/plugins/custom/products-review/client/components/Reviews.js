import React, { Component } from "react";
import ReactStars from "react-stars";
import { Meteor } from "meteor/meteor";
import "../stylesheet/style.css";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import moment from "moment";
// import toastrOption from "../../utils/toastrOption";
/**
 * @class Review
 *
 * @classdesc user post review
 *
 */
class Reviews extends Component {
  /**
   * constructor - contains the constructor
   *
   * @param  {object} props the properties of the class component
   *
   * @return {void} no return or void
   *
   */
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      rating: 0,
      username: "",
      disableBtn: true,
      reviews: ""
    };
    this.onChange = this.onChange.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
    this.addReview = this.addReview.bind(this);
    this.displayReviews = this.displayReviews.bind(this);
  }
  /**
 *
 * @returns { object } updated state
 * @memberof Ratings
*/
  componentDidMount() {
    const productName = Reaction.Router.getParam("handle");
    Meteor.call("getAllReviews", productName, (error, response) => {
      if (error) {
        return error;
      }
      this.setState({ reviews: response });
    });
  }
  /**
   * @description - handles the onchange event
   *
   * @param  {object} event the event for the content field
   *
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.name === "review" && event.target.value.trim() === "") {
      this.setState({
        disableBtn: true
      });
      return false;
    }
    this.setState({
      disableBtn: false
    });
    return true;
  }
  displayReviews() {
    const allReviews = this.state.reviews;
    if (allReviews.length === 0) {
      return (<div className="reviews-contents">No reviews yet.</div>);
    }
    console.log(allReviews);
    return (
      allReviews.map((review) => (
        <div key={review._id}>
          <div className="reviews-contents">
            <a href="#" className="comment-author" title="Comment Author">
              <h4>{review.username}</h4>
            </a>
            <p>{review.review}</p>
            <small className="text-muted">
              created at:
              {moment(review.createdAt).format("Do MMMM YYYY HH:mm")}
            </small>
            <ReactStars
              count={5}
              size={10}
              edit={false}
              value={review.rating}
            />
          </div>
        </div>
      ))
    );
  }
  /**
   * @description - handles user ratings
   *
   * @param  {Number} newRating
   *
   * @return {void}
   */
  ratingChanged = (newRating) => {
    this.setState(() => (
      { rating: newRating }
    ));
  }
  addReview(event) {
    event.preventDefault();
    if (this.state.rating === 0 && this.state.review.trim() === "") {
      Alerts.toast("Your review is highly needed", "error", {
        placement: "productDetail",
        autoHide: 10000
      });
    } else if (this.state.rating === 0 && this.state.review.trim() !== "") {
      Alerts.toast("Your rating is needed to serve you better", "error", {
        placement: "productDetail",
        autoHide: 10000
      });
    } else if (!Meteor.user().name) {
      Alerts.toast("You need to complete your profile fields before you review", "error", {
        placement: "productDetail",
        autoHide: 20000
      });
    } else {
      const reviewObj = {
        rating: this.state.rating,
        review: this.state.review,
        username: Meteor.user().name,
        userId: Meteor.user()._id,
        type: 1,
        destination: this.props.product._id
      };
      Meteor.call("createReview", reviewObj, (err, response) => {
        const destination = this.props.product._id;
        if (err) {
        console.log(err);
        }
        if (response) {
          this.setState({
            rating: 0,
            review: ""
          });
          Meteor.call("productRating", (destination, reviewObj.rating), (error) => {
            if (error) {
              console.log(error);
            }
          });
          Meteor.call("getAllReviews", destination, (error, result) => {
            if (error) {
              return error;
            }
            this.setState({ reviews: result });
          });
        }
      });
    }
  }
  /**
   * @description render - renders the class component
   *
   * @return {object} returns an object
   *
   */
  render() {
    const { ratingChanged, onChange, addReview, displayReviews } = this;
    return (
      <div>
        <div className="bus-info-reviews">
          <h3><b>Reviews and Ratings</b></h3>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="post-form">
                  <div className="display-reviews">
                    { displayReviews() }
                  </div>
                  <form
                    action="#"
                    method=""
                    role="form"
                    onSubmit={addReview}
                  >
                    <textarea
                      name="review"
                      value={this.state.review}
                      onChange={onChange}
                      required
                    />
                    <p>Rate this product:</p>
                    <div>
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={15}
                        color2={"#ffd700"}
                        value={this.state.rating}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={this.state.disableBtn}
                      className="btn send-button"
                    >
                      Add review
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Reviews.propTypes = {
  product: PropTypes.object,
  rating: PropTypes.string
};
export default Reviews;
