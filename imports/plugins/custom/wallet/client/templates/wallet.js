import { Template } from "meteor/templating";
import { WalletContainer } from "../containers";
import { AdminWallet } from "../components/admin";

Template.wallet.helpers({
  wallet() {
    return {
      component: WalletContainer
    };
  }
});

Template.adminWalletSettings.helpers({
  adminWalletSettings() {
    return {
      component: AdminWallet
    };
  }
});
