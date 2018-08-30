import { compose, withProps } from "recompose";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Media } from "../../../../../../lib/collections";
import { OrderSummary } from "../components";

const handlers = {
};

handlers.handleDisplayMedia = (item) => {
  const variantId = item.variants._id;
  const { productId } = item;

  const variantImage = Media.findOne({
    "metadata.variantId": variantId,
    "metadata.productId": productId
  });

  if (variantImage) {
    return variantImage;
  }

  const defaultImage = Media.findOne({
    "metadata.productId": productId,
    "metadata.priority": 0
  });

  if (defaultImage) {
    return defaultImage;
  }
  return false;
};

const composer = (props, onData) => {
  const { order } = props;
  const orderSummary = {
    quantityTotal: order.getCount(),
    subtotal: order.getSubTotal(),
    shippingTotal: order.getShippingTotal(),
    tax: order.getTaxTotal(),
    discounts: order.getDiscounts(),
    total: order.getTotal(),
    shipping: order.shipping
  };

  const productImages = Media.find().fetch();

  onData(null, {
    isProfilePage: true,
    shops: order.getShopSummary(),
    isShowingModal: props.isShowingModal,
    closeModal: props.closeModal,
    order,
    orderId: order._id,
    orderSummary,
    paymentMethods: order.getUniquePaymentMethods(),
    productImages
  });
};

registerComponent("OrderSummary", OrderSummary, [composeWithTracker(composer), withProps(handlers)]);

export default compose(
  composeWithTracker(composer),
  withProps(handlers)
)(OrderSummary);

