import { Meteor } from "meteor/meteor";
import { Wallets } from "../../lib/schemas";

/**
 * @file Methods for wallet. Run these methods using `Meteor.call()`.
 *
 *
 * @namespace Methods/Notification
*/
Meteor.methods({
  /**
  * @method
  * @summary This will create a wallet for a user
  */
  "wallet/create": function () {
    if (!Wallets.findOne({ userId: Meteor.userId() })) {
      return Wallets.insert({ userId: Meteor.userId() });
    }
  }
});
