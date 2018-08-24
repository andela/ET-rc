import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";

class AdminWallet extends Component {
  render() {
    return (
      <div>
        <h5>Wallet Enable</h5>
        <p>
          Customers can fund their wallet using the Paystack payment option.
          Enable PayStack if it is not enabled.
        </p>
      </div>
    );
  }
}

registerComponent("AdminWallet", AdminWallet);

export default AdminWallet;

