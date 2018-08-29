import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Orders } from "../../../../../../lib/collections";

// Total, grand total and status
// Meteor.publish("all.product.orders", function (productId) {
//   check(productId, String);
//   if (Meteor.isServer) {
//     return Orders.aggregate([
//       { $unwind: "$items" },
//       { $group: {
//         _id: "$items.productId",
//         productName: "$items.title",
//         firstSaleDate: { $first: "$createdAt" },
//         latestSaleDate: { $last: "$createdAt" },
//         shopId: "$items.shopId",
//         pending: {},
//         cancelled: {},
//         completed: {},
//         status: "$items.workflow.status",
//         variant: "$items.variants",
//         total: { $sum: "$" },
//         totalOrdered: { $sum: "$items.quantity" },
//         totalOrdersMade: { $sum: 1 }
//       } }
//       // { $sort: { totalCount: -1 } },
//       // { $limit: limit }
//     ]);
//   }
// });

Meteor.publish("orders.status", function () {
  if (Meteor.isServer) {
    return Orders.aggregate([
      { $group: {
        _id: "$items.workflow.status",
        status: { $sum: 1 }
      } }
    ]);
  }
});

Meteor.publish("grand.total", function () {
  if (Meteor.isServer) {
    return Orders.aggregate([
      { $match: { "workflow.status": "coreOrderWorkflow/completed" } },
      { $unwind: "$items" },
      { $group: {
        _id: null,
        grandTotal: { $sum: "$items.variants.price" }
      }
      }
      // { $project: { grandTotal: { $sum: "$items.variants.price" } } }
    ]);
  }
});

Meteor.publish("product.total.price", function () {
  if (Meteor.isServer) {
    return Orders.aggregate([
      { $unwind: "$items" },
      { $match: { "workflow.status": "coreOrderWorkflow/completed" } },
      { $group: {
        _id: "$items.productId",
        totalOrdered: { $sum: "$items.quantity" },
        total: { $sum: "$items.variants.price" },
        totalOrdersMade: { $sum: 1 }
      } }
      // { $sort: { totalCount: -1 } },
      // { $limit: limit }
    ]);
  }
});
