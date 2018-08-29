import { Template } from "meteor/templating";
import { WalletContainer, WalletCheckoutContainer } from "../containers";
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

Template.walletPaymentForm.helpers({
  walletPaymentForm() {
    return {
      component: WalletCheckoutContainer
    };
  }
});
