import {
  Meteor
} from "meteor/meteor";
import { Reviews } from "../../lib/collections";
import { check } from "meteor/check";
// import * as Collections from "/lib/collections";
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

  getAllReviews: (reviewQuery) => {
    check(reviewQuery, Object);
    const count = Reviews.find({
      destination: reviewQuery.destination
    }).count();

    const reviews = Reviews.find({
      destination: reviewQuery.destination
    }, { limit: reviewQuery.limit, skip: reviewQuery.skip, sort: { createdAt: -1 } }).fetch();

    const totalRating =  Reviews.aggregate([
      { $match: { destination: reviewQuery.destination } },
      { $group: { _id: null, totalRating: { $sum: "$rating" } } }
    ]);
    const averageRating = totalRating[0].totalRating / count;
    return { reviews, count, averageRating };
  }
});
