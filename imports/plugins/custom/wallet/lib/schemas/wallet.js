import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

/**
 * @type {SimpleSchema}
 * @property {String} _id required
 * @property {String} userId required
 * @property {Number} balance can be optional
 * @property {Date} createdAt required
 */
export const Wallets = new SimpleSchema({
  _id: {
    type: String
  },
  userId: {
    type: String
  },
  balance: {
    type: Number,
    defaultValue: 0.00,
    min: 0.00,
    decimal: true
  },

  createdAt: {
    type: Date,
    optional: false,
    defaultValue: new Date()
  }
});

registerSchema("Wallets", Wallets);
