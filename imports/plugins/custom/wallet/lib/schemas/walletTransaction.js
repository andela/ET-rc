import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { registerSchema } from "@reactioncommerce/reaction-collections";

/**
 * @type {SimpleSchema}
 * @property {String} _id required
 * @property {String} walletId required
 * @property {Number} worth required - worth of the transaction
 * @property {Number} startingBalance required - balance before transaction
 * @property {Number} closingBalance required - balance after transaction
 * @property {Date} createdAt required
 */
export const WalletTransaction = new SimpleSchema({
  _id: {
    type: String
  },
  walletId: {
    type: String
  },
  startingBalance: {
    type: Number,
    optional: false,
    decimal: true
  },
  worth: {
    type: Number,
    optional: false,
    decimal: true
  },
  closingBalance: {
    type: Number,
    optional: false,
    decimal: true
  },
  type: {
    type: String
  },
  createdAt: {
    type: Date,
    optional: false,
    defaultValue: new Date()
  }
});

registerSchema("WalletTransaction", WalletTransaction);
