import {
  Meteor
} from "meteor/meteor";
import { Reviews } from "../../lib/collections";
import { check } from "meteor/check";
/**
    * Methods
    * @param {Object}
    * @returns {Object} Ratings and reviews
 */
Meteor.methods({
  createReview: (review) => {
    check(review, Object);
    return Reviews.insert(review);
  },
  getAllReviews: (destination) => {
    check(destination, String);
    return Reviews.find({
      destination
    }, { sort: { createdAt: -1 } }).fetch();
  }
});
