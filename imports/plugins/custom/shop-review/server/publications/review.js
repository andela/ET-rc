import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reviews } from "../../../products-review/lib/collections";
import { Products, Shops } from "../../../../../../lib/collections";

Meteor.publish("shop.reviews", function (shopId) {
  check(shopId, String);
  if (Meteor.isServer) {
    return Reviews.find({
      destination: shopId
    }, {
      sort: { createdAt: -1 }
    });
  }
});

Meteor.publish("shop.details", function (shopId) {
  check(shopId, String);
  if (Meteor.isServer) {
    return Shops.find({ _id: shopId });
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
    return Reviews.find({});
  }
});
