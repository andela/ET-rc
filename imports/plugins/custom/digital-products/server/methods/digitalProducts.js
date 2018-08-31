import { Meteor } from "meteor/meteor";
import { Products } from "/lib/collections";
import { check } from "meteor/check";
import { Reaction } from "/server/api";

Meteor.methods({
  addDigitalProduct: function (productDetails) {
    check(productDetails, Object);

    let result;
    if (!productDetails.uploadSuccess) {
      const { productId, isDigital } = productDetails;

      const product = Products.findOne(productId);

      if (!product) {
        throw new Meteor.Error("Product not found");
      } else if (!Reaction.hasPermission("createProduct", this.userId, product.shopId)) {
        throw new Meteor.Error("Access Denied");
      }

      result = Products.update(product._id,
        {
          $set: {
            isDigital: isDigital
          }
        }, {
          selector: {
            type: "simple"
          }
        });
    }
    if (productDetails.uploadSuccess) {
      const { productId, productUrl } = productDetails;

      const product = Products.findOne(productId);

      if (!product) {
        throw new Meteor.Error("Product not found");
      } else if (!Reaction.hasPermission("createProduct", this.userId, product.shopId)) {
        throw new Meteor.Error("Access Denied");
      }

      result = Products.update(product._id,
        {
          $set: {
            productUrl: productUrl
          }
        }, {
          selector: {
            type: "simple"
          }
        });
    }
    return result;
  },

  fetchDigitalProduct: function (productId) {
    check(productId, String);

    const product = Products.findOne({
      _id: productId,
      isDigital: true
    });
    if (product !== undefined) {
      return product;
    }
    return "";
  }
});
