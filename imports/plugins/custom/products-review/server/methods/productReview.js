import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reviews } from "../../lib/collections";

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

    let averageRating;
    if (totalRating.length < 1) {
      averageRating = 0;
    } else {
      averageRating = totalRating[0].totalRating / count;
    }
    return { reviews, count, averageRating };
  }
});
