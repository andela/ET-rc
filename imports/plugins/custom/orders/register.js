import { Reaction } from "../../../../server/api";

Reaction.registerPackage({
  label: "Orders",
  name: "reaction-customer-orders",
  autoEnable: true,
  registry: [
    {
      route: "/orders",
      name: "orders",
      template: "customerOrders"
    }
  ]
});
