import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const Reviews = new SimpleSchema({
  username: {
    type: String
  },
  rating: {
    type: Number,
    optional: true
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
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
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
registerSchema("Reviews", Reviews);
