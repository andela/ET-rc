import React, { Component } from "react";
import { Reaction } from "/client/api";
import { Components } from "@reactioncommerce/reaction-components";
import PropTypes from "prop-types";

import "../../styles/index.css";

class WalletCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: {
        balance: 0
      },
      currency: "",
      total: 0,
      isSufficient: false
    };
    this.redirectToWalletPage = this.redirectToWalletPage.bind(this);
  }

  componentDidMount() {
    this.props.createWalletIfNotExist();
    setTimeout(() => {
      this.mapPropsToState();
    }, 500);
  }

  mapPropsToState() {
    if (this.props.wallet) {
      this.setState({
        wallet: this.props.wallet,
        total: this.props.total,
        currency: this.props.currency,
        isSufficient: this.props.wallet.balance >= this.props.total
      });
    }
  }

  redirectToWalletPage() {
    Reaction.Router.go("/account/wallet");
  }

  renderBalance() {
    return (
      <h4>Balance: <Components.Currency amount={this.state.wallet.balance.toString()} /></h4>
    );
  }

  renderBalanceWarning() {
    return (
      <div className="balance-warning">
        {this.state.isSufficient ? "" :
          <p>
            You cannot pay from your wallet because your wallet balance is insufficient.
            Consider funding your wallet.
          </p>}
      </div>
    );
  }

  renderActionButtons() {
    const { total } = this.props;
    return (
      <div>
        {this.state.isSufficient ?
          <button
            onClick={() => this.props.checkout(this.state.wallet, total)}
            className="rui btn btn-lg btn-cta btn-block btn-complete-order"
          >
            Pay from wallet
          </button> :
          <button onClick={this.redirectToWalletPage} className="rui btn btn-lg btn-cta btn-block btn-complete-order">Fund your wallet</button>
        }
      </div>
    );
  }

  render() {
    return (
      <div className="wallet-container">
        <h3 className="nav-dashboard-title">
          <span>Wallet</span>
        </h3>
        {this.renderBalance()}
        {this.renderBalanceWarning()}
        {this.renderActionButtons()}
      </div>
    );
  }
}

WalletCheckout.propTypes = {
  checkout: PropTypes.func.isRequired,
  createWalletIfNotExist: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  wallet: PropTypes.object.isRequired
};

export default WalletCheckout;
