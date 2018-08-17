import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reviews } from "../../../reviews/lib/collections";
import { Products, Shops } from "../../../../../../lib/collections";

Meteor.publish("shop.reviews", function (shopId) {
  check(shopId, String);
  if (Meteor.isServer) {
    if (!this.userId) {
      return this.ready();
    }
    return Reviews.find({
      shopId
    }, {
      sort: { createdAt: -1 }
    }
    );
  }
});

Meteor.publish("shop.details", function (shopId) {
  check(shopId, String);
  if (Meteor.isServer) {
    return Shops.findOne({ _id: shopId });
  }
});

Meteor.publish("shop.products", function (shopId) {
  check(shopId, String);
  if (Meteor.isServer) {
    return Products.find({
      shopId: shopId
    });
  }
});

Meteor.publish("shop.average.rating", function (shopId) {
  check(shopId, String);
  if (Meteor.isServer) {
    const result = Reviews.aggregate([
      {
        $match: { shopId }
      },
      {
        $group: {
          _id: "$shopId",
          averageRating: { $avg: "$rating" }
        }
      }
    ]);
    return result[0].averageRating;
  }
});
