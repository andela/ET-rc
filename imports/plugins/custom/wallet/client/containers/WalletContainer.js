import { compose, withProps } from "recompose";
import { Random } from "meteor/random";
import { Meteor } from "meteor/meteor";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Wallets, WalletTransaction } from "../../lib/schemas";
import { Wallet } from "../components/walletManager";

const handlers = {
  createWalletIfNotExist() {
    return Meteor.call("wallet/create");
  },
  getTransactions(limit, skip) {
    let transactions = [];
    const wallet = Wallets.findOne({ userId: Meteor.userId() });

    if (wallet) {
      transactions = WalletTransaction.find({ walletId: wallet._id }, { limit, skip, sort: { createdAt: -1 } }).fetch();
    }
    return transactions;
  },
  fundWalletWithPaystack(amount, email) {
    return new Promise((resolve, reject) => {
      Meteor.call("paystack/getShopKeys", (error, paystackKeys) => {
        if (error) {
          Alerts.toast("Error fetching paystack keys", "error", {
            autoHide: 10000
          });
        }
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
  let transactionCount = 0;
  const subscription = Meteor.subscribe("Wallet");
  const walletTransactionSub = Meteor.subscribe("WalletTransaction");
  if (subscription.ready() && walletTransactionSub.ready()) {
    wallet = Wallets.findOne({ userId: Meteor.userId() });
    transactionCount = WalletTransaction.find({ walletId: wallet._id }).count();
  }
  onData(null, { wallet, transactionCount });
};

registerComponent("Wallet", Wallet, [composeWithTracker(composer), withProps(handlers)]);

export default compose(
  composeWithTracker(composer),
  withProps(handlers)
)(Wallet);

