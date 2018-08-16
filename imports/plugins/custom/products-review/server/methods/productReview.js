import {
  Meteor
} from "meteor/meteor";
import { Reviews } from "../../lib/collection";
import { check } from "meteor/check";
import { Products } from "/lib/collections/collections";
/**
     * Methods
     * @returns {Object} Ratings
     */
Meteor.methods({
  "createReview"(review) {
    check(review, Object);
    return Reviews.insert(review);
  },

  "productRating"(id, rating) {
    return Products.findOneAndUpdate({ _id: id },
      {
        $inc: { ratingCount: 1, totalRating: Number(rating) }
      });
  },
  "getAllReviews"(productId) {
    return Reviews.find({
      productId
    }, { sort: { createdAt: -1 } }).fetch();
  }
});
