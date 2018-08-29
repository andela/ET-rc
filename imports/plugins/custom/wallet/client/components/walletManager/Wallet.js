import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-responsive-modal";
import "./wallet.css";

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      open: false
    };
    this.onChange = this.onChange.bind(this);
    this.fundWallet = this.fundWallet.bind(this);
    this.onModal = this.onModal.bind(this);
  }

  componentDidMount() {
    this.props.createWalletIfNotExist();
  }

  /**
   * @param  {} e set state on input onchange event
   */
  onChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  fundWallet(e) {
    e.preventDefault();
    let { amount } = this.state;
    amount = Number(amount);
    if (amount < 1000) {
      return Alerts.toast("Amount must be 1000 and above", "error", {
        autoHide: 20000
      });
    }
    this.props.fundWalletWithPaystack(amount * 100).then(
      () => {
        const wallet = this.props.wallet;
        const type = "Credit";
        this.props.creditWallet(wallet, amount, type);
        this.onModal();
      }
    );
  }

  renderBalance() {
    let { balance } = this.props.wallet;
    balance = balance === undefined || balance === 0 ? "0.00" : balance;
    return (
      <h3>Balance: &#8358;{ balance }</h3>
    );
  }

  onModal() {
    this.setState({ open: !this.state.open });
  }

  modal() {
    return (
      <div className="row">
        <div className="col-6 text-white">
          <button onClick={this.onModal} className="btn text-white color">Fund Wallet</button>
          <Modal open={this.state.open} onClose={this.onModal} center>
            <br /><h3> Enter Amount to fund your wallet</h3>
            <form className="form-horizontal">
              <label className="control-label col-sm-2">Amount</label>
              <input className="form-control" type="number" onChange={this.onChange} name="amount"/><br />
              <button onClick={this.fundWallet} className="btn text-white color">Fund Wallet</button>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className="text-center">
          { this.renderBalance() }
          {this.modal()}
        </div>
        <h3>Transactions</h3>
      </div>
    );
  }
}

Wallet.propTypes = {
  createWalletIfNotExist: PropTypes.func.isRequired,
  creditWallet: PropTypes.func.isRequired,
  fundWalletWithPaystack: PropTypes.func.isRequired,
  wallet: PropTypes.object.isRequired
};
export default Wallet;
