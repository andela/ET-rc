import { compose, withProps } from "recompose";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Cart, Shops, Packages } from "../../../../../../lib/collections";
import { Wallets } from "../../lib/schemas";
import { WalletCheckout } from "../components/checkout";

const handlers = {
  createWalletIfNotExist() {
    return Meteor.call("wallet/create");
  },
  checkout(wallet, amount) {
    Meteor.subscribe("Packages", Reaction.getShopId());
    const packageData = Packages.findOne({
      name: "wallet",
      shopId: Reaction.getShopId()
    });
    let paymentMethod;
    Meteor.call("wallet/updateBalance", wallet, amount, "Debit", function () {
      paymentMethod = {
        processor: "Wallet",
        paymentPackageId: packageData._id,
        paymentSettingsKey: packageData.registry[0].settingsKey,
        storedCard: "",
        method: "credit",
        transactionId: "",
        riskLevel: "normal",
        currency: Shops.findOne().currency,
        amount: parseFloat(amount),
        status: "success",
        mode: "authorize",
        createdAt: new Date(),
        transactions: []
      };
      Meteor.call("cart/submitPayment", paymentMethod);
    });
  }
};

const composer = (props, onData) => {
  let wallet = {};
  let total = "0";
  let currency = "";
  const subscription = Meteor.subscribe("Wallet");
  if (subscription.ready()) {
    wallet = Wallets.findOne({ userId: Meteor.userId() });
    total = Cart.findOne().getTotal();
    currency = Shops.findOne().currency;
  }
  onData(null, { wallet, total, currency });
};

registerComponent("WalletCheckout", WalletCheckout, [composeWithTracker(composer), withProps(handlers)]);

export default compose(
  composeWithTracker(composer),
  withProps(handlers)
)(WalletCheckout);

