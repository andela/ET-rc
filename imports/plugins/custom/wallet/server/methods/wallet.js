import { Meteor } from "meteor/meteor";
import { Wallets, WalletTransaction } from "../../lib/schemas";
import { Cart } from "../../../../../../lib/collections";
import { check } from "meteor/check";

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
  },
  /**
  * @method
  * @param {Number} balance - The new balance
  * @summary This will updated the balance of a waller through the userId
  */
  "wallet/updateBalance": function (wallet, amount) {
    check(wallet, Object);
    check(amount, String);

    const newBalance = wallet.balance - amount;
    Wallets.update({ userId: Meteor.userId() }, { $set: { balance: newBalance } });
    return WalletTransaction.insert({
      walletId: wallet._id,
      worth: amount,
      startingBalance: wallet.balance,
      closingBalance: newBalance,
      cartId: Cart.findOne()._id,
      type: "Debit"
    });
  }
});
