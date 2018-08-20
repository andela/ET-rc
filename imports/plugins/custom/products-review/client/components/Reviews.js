import React, { Component } from "react";
import ReactStars from "react-stars";
import { Meteor } from "meteor/meteor";
import "../stylesheet/style.css";
import PropTypes from "prop-types";
import moment from "moment";
import Pagination from "react-js-pagination";
// import toastrOption from "../../utils/toastrOption";
/**
 * @class Review
 *
 * @classdesc user post review
 *
 */
const limit = 5;
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
      reviews: "",
      totalCount: 0,
      averageRating: 0,
      activePage: 1
    };
    this.onChange = this.onChange.bind(this);
    this.ratingChanged = this.ratingChanged.bind(this);
    this.addReview = this.addReview.bind(this);
    this.reviewList = this.reviewList.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**
 *
 * @returns { object } updated state
 * @memberof Ratings
*/
  componentDidMount() {
    const destination = this.props.product._id;
    const reviewQuery = { limit, skip: 0, destination };
    Meteor.call("getAllReviews", reviewQuery, (error, response) => {
      if (error) {
        return error;
      }
      this.setState({ reviews: response.reviews, totalCount: response.count, averageRating: response.averageRating });
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

  handlePageChange(pageNumber) {
    const destination = this.props.product._id;
    const skip = (pageNumber - 1) * limit;
    const reviewQuery = { limit, skip, destination };
    Meteor.call("getAllReviews", reviewQuery, (error, result) => {
      if (error) {
        return error;
      }
      this.setState({ reviews: result.reviews,
        activePage: pageNumber
      });
    });
    this.setState({ activePage: pageNumber });
  }

  reviewList() {
    const allReviews = this.state.reviews;
    if (allReviews.length === 0) {
      return (<div className="reviews-contents">No reviews yet.</div>);
    }
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
              value={Number(review.rating)}
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
          return err;
        }
        if (response) {
          const skip = (this.state.activePage - 1) * limit;
          const reviewQuery = { limit, skip, destination };
          Meteor.call("getAllReviews", reviewQuery, (error, result) => {
            if (error) {
              return error;
            }
            this.setState({
              averageRating: result.averageRating,
              reviews: result.reviews,
              totalCount: result.count
            });
          });
          this.setState({
            rating: 0,
            review: ""
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
    const { ratingChanged, onChange, addReview, reviewList } = this;
    return (
      <div>
        <div className="bus-info-reviews">
          <h3><b>{this.state.totalCount && this.state.totalCount} Review{this.state.totalCount > 1 && "s"} and Rating{this.state.totalCount > 1 && "s"}</b></h3>
          <div className="center-average">
            <h3 className="average-rating">Average Rating</h3>
            <div className="rts">
              <ReactStars
                count={5}
                size={10}
                edit={false}
                value={this.state.totalRating / this.state.totalCount}
              /> <br /> <p className="rating-text"> {(Math.round(this.state.averageRating * 10) / 10).toFixed(2)} </p>
              <br /><p>{this.state.totalCount} Reviews </p>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="post-form">
                  <div className="display-reviews">
                    { reviewList() }
                  </div>
                  <div className="paginate text-center">
                    <Pagination
                      activePage={this.state.activePage}
                      itemsCountPerPage={5}
                      totalItemsCount={this.state.totalCount}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
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
                    <div className="react-start text-center">
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={15}
                        color2={"#ffd700"}
                        value={Number(this.state.rating)}
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
