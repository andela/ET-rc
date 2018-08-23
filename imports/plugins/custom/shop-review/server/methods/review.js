import { Meteor } from "meteor/meteor";
import { Reviews } from "../../lib/collections";
import { check } from "meteor/check";

/**
 * Methods
 * @returns {Object} Revies
 */
Meteor.methods({
  "create.review"(reviewObject) {
    check(reviewObject, Object);
    return Reviews.insert(reviewObject);
  },
  "shop.average.rating"(destination) {
    check(destination, String);
    const result = Reviews.aggregate([
      {
        $match: { destination }
      },
      {
        $group: {
          _id: "$destination",
          averageRating: { $avg: "$rating" }
        }
      }
    ]);
    return result[0].averageRating;
  }
  // "shop.details"(shopId) {
  //   check(shopId, String);
  //   const result = Shops.findOne({ _id: shopId });
  //   return result;
  // }
});
