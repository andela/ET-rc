import React, { Component } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import CompletedOrder from "../../../../core/checkout/client/components/completedOrder";

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)"
};
const customStyles = {
  overlay,
  content: {
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "6px",
    outline: "none",
    position: "absolute",
    top: "10%",
    left: "10%",
    right: "10%",
    bottom: "10%",
    padding: "12px",
    background: "#ffffff"
  }
};

class OrderSummary extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isShowingModal}
          style={customStyles}
          onRequestClose={this.props.closeModal}
          shouldCloseOnEsc
          contentLabel="Example Modal"
        >
          <CompletedOrder
            shops={this.props.shops}
            order={this.props.order}
            orderId={this.props.orderId}
            orderSummary={this.props.orderSummary}
            paymentMethods={this.props.paymentMethods}
            productImages={this.props.productImages}
            handleDisplayMedia={this.props.handleDisplayMedia}
            isProfilePage={this.props.isProfilePage}
          />
          <div style={{ textAlign: "center" }}>
            <button onClick={this.props.closeModal} className="btn btn-default">Close</button>
          </div>
        </Modal>
      </div >
    );
  }
}

OrderSummary.propTypes = {
  closeModal: PropTypes.func.isRequired,
  handleDisplayMedia: PropTypes.func.isRequired,
  isProfilePage: PropTypes.bool.isRequired,
  isShowingModal: PropTypes.bool.isRequired,
  order: PropTypes.object.isRequired,
  orderId: PropTypes.string.isRequired,
  orderSummary: PropTypes.object.isRequired,
  paymentMethods: PropTypes.array.isRequired,
  productImages: PropTypes.array.isRequired,
  shops: PropTypes.array.isRequired
};


export default OrderSummary;
