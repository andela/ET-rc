import { compose, withProps } from "recompose";
import { Random } from "meteor/random";
import { Meteor } from "meteor/meteor";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Wallets } from "../../lib/schemas";
import { Wallet } from "../components/walletManager";
import { Accounts } from "/lib/collections";

const handlers = {
  createWalletIfNotExist() {
    return Meteor.call("wallet/create");
  },
  fundWalletWithPaystack(amount) {
    return new Promise((resolve, reject) => {
      const userId = Meteor.user()._id;
      Meteor.call("paystack/getShopKeys", (error, paystackKeys) => {
        if (error) {
          Alerts.toast("Error fetching paystack keys", "error", {
            autoHide: 10000
          });
        }
        const email = Accounts.findOne({ userId }).emails[0].address;
        if (paystackKeys) {
          const key = paystackKeys.publicKey;
          const paymentInfo = {
            key,
            amount,
            email,
            reference: Random.id(),
            callback: (response) => {
              resolve(response);
            },
            onClose() {
              Alerts.toast("Transaction cancelled", "error", {
                autoHide: 10000
              });
            }
          };
          try {
            PaystackPop.setup(paymentInfo).openIframe();
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  },

  creditWallet(wallet, amount, type) {
    Meteor.call("wallet/updateBalance", wallet, amount, type);
  }
};
const composer = (props, onData) => {
  let wallet = {};
  const subscription = Meteor.subscribe("Wallet");
  if (subscription.ready()) {
    wallet = Wallets.findOne({ userId: Meteor.userId() });
  }
  onData(null, { wallet });
};

registerComponent("Wallet", Wallet, [composeWithTracker(composer), withProps(handlers)]);

export default compose(
  composeWithTracker(composer),
  withProps(handlers)
)(Wallet);

