import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "react-responsive-modal";
import Pagination from "react-js-pagination";
import { Components } from "@reactioncommerce/reaction-components";
import "../../styles/index.css";

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      open: false,
      email: "",
      transactions: [],
      activePage: 1
    };
    this.onChange = this.onChange.bind(this);
    this.fundWallet = this.fundWallet.bind(this);
    this.onModal = this.onModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.props.createWalletIfNotExist();
    setTimeout(() => {
      this.setTransactions(this.props.getTransactions(5, 0));
    }, 500);
  }

  /**
   * @param  {} e set state on input onchange event
   */
  onChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  setTransactions(transactions) {
    this.setState({ transactions });
  }

  fundWallet(e) {
    e.preventDefault();
    let { amount } = this.state;
    const { email } = this.state;
    amount = Number(amount);
    if (!email) {
      return Alerts.toast("Email is required", "error", {
        autoHide: 20000
      });
    } else if (amount < 1000) {
      return Alerts.toast("Amount must be 1000 and above", "error", {
        autoHide: 20000
      });
    }
    this.props.fundWalletWithPaystack(amount * 100, email).then(
      () => {
        const wallet = this.props.wallet;
        const type = "Credit";
        this.props.creditWallet(wallet, amount, type);
        this.onModal();
        setTimeout(() => {
          const transactions = this.props.getTransactions(5, 0);
          this.setState({ transactions, activePage: 1 });
        }, 1200);
      }
    );
  }

  handlePageChange(pageNumber) {
    const { getTransactions } = this.props;
    const offset = (pageNumber - 1) * 5;
    this.setState({ transactions: getTransactions(5, offset), activePage: pageNumber });
  }

  renderBalance() {
    let { balance } = this.props.wallet;
    balance = balance === undefined || balance === 0 ? "0.00" : balance.toFixed(2);
    return (
      <h3>Balance: <Components.Currency amount={balance} /></h3>
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
            <div style={{ textAlign: "center" }}>
              <br /><h3>Enter Email and Amount</h3>
              <form className="form-horizontal">
                <input
                  style={{ minWidth: 300 }}
                  placeholder="Email"
                  className="form-control"
                  type="email"
                  onChange={this.onChange}
                  name="email"
                /><br />
                <input
                  style={{ minWidth: 300 }}
                  placeholder="Amount"
                  className="form-control"
                  type="number"
                  onChange={this.onChange}
                  name="amount"
                /><br />
                <button onClick={this.fundWallet} className="btn text-white color">Fund Wallet</button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    );
  }

  renderTableRow() {
    return this.state.transactions.map(transaction =>
      <tr key={transaction._id}>
        <td>{new Date(transaction.createdAt).toDateString()}</td>
        <td>{transaction.type}</td>
        <td><Components.Currency amount={transaction.worth.toString()} /></td>
        <td><Components.Currency amount={transaction.startingBalance.toString()} /></td>
        <td><Components.Currency amount={transaction.closingBalance.toString()} /></td>
        <td>{transaction.cartId}</td>
      </tr>);
  }

  renderTransactionTable() {
    return (
      <div>
        {this.state.transactions.length > 0 ?
          <table className="table table-bordered order-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Worth</th>
                <th>Starting Balance</th>
                <th>Closing Balance</th>
                <th>Cart ID</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTableRow()}
            </tbody>
          </table>
          : <div><p>No transaction has been made on your wallet.</p></div>}
      </div>
    );
  }

  renderPagination() {
    return (
      <div>{this.props.transactionCount > 5 ?
        <div style={{ textAlign: "center" }}>
          <Pagination
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={this.props.transactionCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div> : ""}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="text-center">
          {this.renderBalance()}
          {this.modal()}
        </div>
        <h3>Transactions</h3>
        {this.renderTransactionTable()}
        {this.renderPagination()}
      </div>
    );
  }
}

Wallet.propTypes = {
  createWalletIfNotExist: PropTypes.func.isRequired,
  creditWallet: PropTypes.func.isRequired,
  fundWalletWithPaystack: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  transactionCount: PropTypes.number.isRequired,
  wallet: PropTypes.object.isRequired
};
export default Wallet;
