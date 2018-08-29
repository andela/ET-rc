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
      { $group: {
        _id: null,
        grandTotal: { $sum: { $multiply: ["$items.variants.price", "$items.quantity"] } }
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
  }
});
