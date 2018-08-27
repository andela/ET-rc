import React, { Component } from "react";
import PropTypes from "prop-types";
import swal from "sweetalert";
import Pagination from "react-js-pagination";
import { Meteor } from "meteor/meteor";
import { OrderSummaryContainer } from "../containers";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isFetchingOrder: true,
      activePage: 1,
      selectedOrderId: ""
    };
    this.showCancelWarning = this.showCancelWarning.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isFetchingOrder: false, orders: this.props.orders });
    }, 1500);
  }

  getOrderStatus = (order) => {
    return order.workflow.status.replace("coreOrderWorkflow/", "");
  }

  setCurrentId(selectedOrderId) {
    this.setState({ selectedOrderId });
  }

  getOrderClassNames = (status) => {
    switch (status) {
      case "new":
        return "rui badge badge-large badge-info";
      case "canceled":
        return "rui badge badge-large badge-danger";
      default:
        return "rui badge badge-large badge-success";
    }
  }

  closeModal() {
    this.setState({ selectedOrderId: "" });
  }

  showCancelWarning(order) {
    const warning = document.createElement("div");
    warning.innerHTML = `<div><h3>You are about to cancel an order you placed on ${new Date(order.createdAt).toDateString()}</h3></div>`;
    swal({
      content: warning,
      icon: "warning",
      dangerMode: true,
      buttons: ["Back", "Proceed"]
    })
      .then((willDelete) => {
        if (willDelete) {
          return Meteor.call("orders/cancelOrder", order, true, () => {
            const newOrder = order;
            newOrder.workflow.status = "coreOrderWorkflow/canceled";
            const { orders } = this.state;
            const index = orders.findIndex(x => x._id === order._id);
            orders[index] = newOrder;
            this.setState({ orders });
            swal("Cancel!", "Your order has been canceled", "success");
          });
        }
      });
  }

  handlePageChange(pageNumber) {
    const { getOrders } = this.props;
    const offset = (pageNumber - 1) * 5;
    this.setState({ orders: getOrders(5, offset), activePage: pageNumber });
  }

  renderTableRow() {
    return this.state.orders.map(order =>
      <tr key={order._id}>
        <td>{order._id}</td>
        <td>{new Date(order.createdAt).toDateString()}</td>
        <td>{order.email}</td>
        <td>{order.shipping[0].shipmentMethod.label}</td>
        <td>
          <div className="status-info">
            <span className={this.getOrderClassNames(this.getOrderStatus(order))}>
              {this.getOrderStatus(order)}
            </span>
          </div>
        </td>
        <td>
          {this.getOrderStatus(order) === "new" || this.getOrderStatus(order) === "processing" ?
            <button onClick={() => this.showCancelWarning(order)} className="btn btn-default">Cancel Order</button> : ""}
        </td>
        <td className="more-button">
          <a onClick={() => this.setCurrentId(order._id)}><i className="fa fa-angle-right" /></a>
        </td>
      </tr>);
  }

  renderOrderTables() {
    return (
      <div>
        { this.renderOrderSummaryModals() }
        <table className="table table-bordered order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Email</th>
              <th>Date</th>
              <th>Shipping</th>
              <th>Status</th>
              <th>Action</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableRow()}
          </tbody>
        </table>
      </div>
    );
  }

  renderOrderSummaryModals() {
    return (
      <div>
        { this.state.orders.map((order) =>
          <OrderSummaryContainer
            key={order._id}
            order={order}
            closeModal={this.closeModal}
            isShowingModal={this.state.selectedOrderId === order._id}
          />)
        }
      </div>
    );
  }

  renderEmptyHeader() {
    return (
      <h3 style={{ textAlign: "center" }}>{this.state.isFetchingOrder ? "" : "Your order history is empty"}</h3>
    );
  }

  renderOrders() {
    return (
      <div>
        {this.state.orders.length > 0 ? this.renderOrderTables() : this.renderEmptyHeader()}
      </div>
    );
  }

  renderPagination() {
    return (
      <div>{this.props.count > 5 ?
        <div style={{ textAlign: "center" }}>
          <Pagination
            hideDisabled
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={this.props.count}
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
        {this.renderOrders()}
        {this.state.orders.length > 0 ? this.renderPagination() : ""}
      </div>
    );
  }
}

Orders.propTypes = {
  count: PropTypes.number.isRequired,
  getOrders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired
};

export default Orders;
