import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

<<<<<<< HEAD:imports/plugins/custom/products-review/lib/schema/review.js
export const ReviewSchema = new SimpleSchema({
=======
export const Reviews = new SimpleSchema({
>>>>>>> 11abd62e0... (ft) : Shop review and rating:imports/plugins/custom/shop-review/lib/collections/schemas/review.js
  username: {
    type: String
  },
  rating: {
    type: Number,
    optional: true,
    decimal: true,
    defaultValue: 0
  },
  review: {
    type: String,
    optional: true
  },
  type: {
    type: String // type 1 is a Product while type 2 is a shop
  },
  userId: {
    type: String,
    optional: true
  },
  destination: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function () {
      return new Date();
    }
  }
});
registerSchema("ReviewSchema",  ReviewSchema);
