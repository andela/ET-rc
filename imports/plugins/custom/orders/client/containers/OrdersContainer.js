import { compose, withProps } from "recompose";
import { Meteor } from "meteor/meteor";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import * as Collections from "../../../../../../lib/collections";
import { Orders } from "../components";

let orders = [];

const handlers = {
  getOrders(limit, skip) {
    return Collections.Orders.find({ userId: Meteor.userId() }, { limit, skip }).fetch();
  }
};

const composer = (props, onData) => {
  const subscription = Meteor.subscribe("Orders");
  let count = 0;
  if (subscription.ready()) {
    orders = Collections.Orders.find({ userId: Meteor.userId() }, { limit: 5 }).fetch();
    count = Collections.Orders.find({ userId: Meteor.userId() }).count();
  }
  onData(null, { orders, count });
};

registerComponent("CustomerOrders", Orders, [composeWithTracker(composer), withProps(handlers)]);

export default compose(
  composeWithTracker(composer),
  withProps(handlers)
)(Orders);

