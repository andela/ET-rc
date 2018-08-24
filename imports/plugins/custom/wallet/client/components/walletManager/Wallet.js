import React, { Component } from "react";
import PropTypes from "prop-types";


class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.props.createWalletIfNotExist();
  }

  renderBalance() {
    let { balance } = this.props.wallet;
    balance = balance === undefined || balance === 0 ? "0.00" : balance;
    return (
      <h3>Balance: &#8358;{ balance }</h3>
    );
  }

  render() {
    return (
      <div>
        { this.renderBalance() }
        <button className="btn btn-primary">Fund Wallet</button>
        <h3>Transactions</h3>
      </div>
    );
  }
}

Wallet.propTypes = {
  createWalletIfNotExist: PropTypes.func.isRequired,
  wallet: PropTypes.object.isRequired
};
export default Wallet;
