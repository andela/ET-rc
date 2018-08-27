import React, { Component } from "react";
import PropTypes from "prop-types";


class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
    this.onChange = this.onChange.bind(this);
    this.fundWallet = this.fundWallet.bind(this);
  }

  componentDidMount() {
    this.props.createWalletIfNotExist();
  }

  /**
   * @param  {} e set state on input onchange event
   */
  onChange(e) {
    const state = this.state;
    console.log(this.state.amount)
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(this.state.amount)
  }

  fundWallet(e) {
    e.preventDefault();
    const { amount } = this.state;
    console.log(amount)
    if (amount) {
      this.props.fundWalletWithPaystack(amount).then(
        (res) => console.log(res)
      );
    }
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
        <form>
        <input type="number" onChange={this.onChange} name="amount"/>
        <button onClick={this.fundWallet} className="btn btn-primary">Fund Wallet</button>
        </form>
        <h3>Transactions</h3>
        {this.state.amount}
      </div>
    );
  }
}

Wallet.propTypes = {
  createWalletIfNotExist: PropTypes.func.isRequired,
  wallet: PropTypes.object.isRequired
};
export default Wallet;
