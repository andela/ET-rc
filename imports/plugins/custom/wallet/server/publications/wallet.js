import { Meteor } from "meteor/meteor";
import { Wallets } from "../../lib/schemas";
import { Reaction } from "/server/api";

Meteor.publish("Wallet", function () {
  if (this.userId === null) {
    return this.ready();
  }
  const shopId = Reaction.getShopId();
  if (!shopId) {
    return this.ready();
  }
  return Wallets.find({
    userId: this.userId
  });
});
