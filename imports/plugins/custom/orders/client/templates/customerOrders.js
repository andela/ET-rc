import { Template } from "meteor/templating";
import { OrdersContainer } from "../containers";

Template.customerOrders.helpers({
  customerOrders() {
    return {
      component: OrdersContainer
    };
  }
});
