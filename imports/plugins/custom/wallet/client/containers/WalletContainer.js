import { compose, withProps } from "recompose";
import { Meteor } from "meteor/meteor";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Wallets } from "../../lib/schemas";
import { Wallet } from "../components/walletManager";

const handlers = {
  createWalletIfNotExist() {
    return Meteor.call("wallet/create");
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

