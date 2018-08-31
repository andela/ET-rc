import { Meteor } from "meteor/meteor";
import { Orders } from "../../../../../../lib/collections";

Meteor.methods({
  "analytics/topTenProducts": function () {
    return Orders.aggregate([
      { $unwind: { path: "$items" } },
      { $match: { "items.quantity": { $gt: 0 }, "workflow.status": "coreOrderWorkflow/canceled" } },
      { $unwind: { path: "$billing" } },
      { $group: {
        _id: "items.productId",
        name: { $first: "$items.title" },
        quantitySold: { $sum: "$items.quantity" },
        total: { $sum: "$billing.paymentMethod.amount" },
        firstPurchaseDate: { $first: "$createdAt" },
        lastPurchaseDate: { $last: "$createdAt" }
      } },
      { $sort: { quantitySold: -1 } },
      { $limit: 10 }
    ]);
  }
});
