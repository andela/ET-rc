import { Meteor } from "meteor/meteor";
import { Orders } from "../../../../../../lib/collections";

/**
 * Methods
 * @returns {Object} Analytics
 */
Meteor.methods({
  "orders.status"() {
    return Orders.aggregate([
      { $group: {
        _id: "$items.workflow.status",
        status: { $sum: 1 }
      } }
    ]);
  },
  "grand.total"() {
    return Orders.aggregate([
      { $match: { "workflow.status": "coreOrderWorkflow/completed" } },
      { $unwind: "$items" },
      { $unwind: { path: "$billing" } },
      { $group: {
        _id: null,
        grandTotal: { $sum: "$billing.paymentMethod.amount" }
      }
      }
    ]);
  },
  "total.quantity.purchased"() {
    return Orders.aggregate([
      { $match: { "workflow.status": "coreOrderWorkflow/completed" } },
      { $unwind: "$items" },
      { $group: {
        _id: null,
        totalBought: { $sum: "$items.quantity" }
      }
      }
    ]);
  },
  "orders.total"() {
    return Orders.aggregate([
      { $match: { "workflow.status": "coreOrderWorkflow/completed" } },
      { $group: {
        _id: null,
        total: { $sum: 1 }
      }
      }
    ]);
  },
  "orders.processing"() {
    return Orders.aggregate([
      { $match: { $or: [{ "workflow.status": "coreOrderWorkflow/processing" }, { "workflow.status": "new" }]  } },
      { $group: {
        _id: null,
        total: { $sum: 1 }
      }
      }
    ]);
  },
  "orders.canceled"() {
    return Orders.aggregate([
      { $match: { "workflow.status": "coreOrderWorkflow/canceled" } },
      { $group: {
        _id: null,
        total: { $sum: 1 }
      }
      }
    ]);
  },
  "orders.completed"() {
    return Orders.aggregate([
      { $match: { "workflow.status": "coreOrderWorkflow/completed" } },
      { $group: {
        _id: null,
        total: { $sum: 1 }
      }
      }
    ]);
  },
  "product.total.price"() {
    return Orders.aggregate([
      { $unwind: "$items" },
      { $match: { "workflow.status": "coreOrderWorkflow/completed" } },
      { $group: {
        _id: "$items.productId",
        totalOrdered: { $sum: "$items.quantity" },
        total: { $sum: "$items.variants.price" }, // multiply by quantity sold
        totalOrdersMade: { $sum: 1 }
      } }
    ]);
  },
  "analytics/topTenProducts": function () {
    return Orders.aggregate([
      { $unwind: { path: "$items" } },
      { $match: { "items.quantity": { $gt: 0 }, "workflow.status": "coreOrderWorkflow/completed" } },
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
