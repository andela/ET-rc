import { Meteor } from "meteor/meteor";
import { Reaction } from "../../../../../../server/api";
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
  "wallet/updateBalance": function (wallet, amount, type) {
    check(wallet, Object);
    check(amount, Number);
    check(type, String);
    let newBalance;
    let cartId = "";
    if (type === "Debit") {
      newBalance = parseFloat(wallet.balance - amount);
      cartId = Cart.findOne()._id;
    } else {
      newBalance = parseFloat(wallet.balance + amount);
    }
    Wallets.update({ userId: Meteor.userId() }, { $set: { balance: newBalance } });
    return WalletTransaction.insert({
      walletId: wallet._id,
      worth: amount,
      startingBalance: wallet.balance,
      closingBalance: newBalance,
      cartId,
      type
    });
  },

  /**
  * @method
  * @summary Initiate a wallet refund
  */
  "wallet/refund": function (paymentMethod) {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);
    const wallet = Wallets.findOne({ userId: Meteor.userId() });
    return Meteor.call("wallet/updateBalance", wallet, parseFloat(paymentMethod.amount), "Credit");
  }
});
