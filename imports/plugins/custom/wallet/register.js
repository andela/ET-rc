import { Reaction } from "../../../../server/api";

Reaction.registerPackage({
  label: "Wallet",
  name: "wallet",
  autoEnable: true,
  registry: [
    {
      provides: ["userAccountDropdown"],
      route: "/account/wallet",
      icon: "fa fa-google-wallet",
      template: "wallet",
      label: "Wallet",
      name: "wallet",
      container: "core",
      workflow: "coreDashboardWorkflow"
    },
    {
      label: "Wallet",
      provides: ["paymentSettings"],
      container: "dashboard",
      template: "adminWalletSettings"
    },
    {
      template: "walletPaymentForm",
      provides: ["paymentMethod"],
      icon: "fa fa-credit-card-alt"
    }
  ]
});
