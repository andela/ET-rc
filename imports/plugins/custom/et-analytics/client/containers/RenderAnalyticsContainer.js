import { compose, withProps } from "recompose";
import { registerComponent, composeWithTracker } from "/imports/plugins/core/components/lib";
import { Meteor } from "meteor/meteor";
import { Orders } from "../../../../../../lib/collections";

import Analytics from "../components";

// function composer(props, onData) {
//   const prodSub = Meteor.subscribe("product.total.price");
//   console.log(prodSub.ready());
//   console.log("cxcx");
//   if (prodSub.ready()) {
//     console.log("dfg");
//     const grand = Orders.find().fetch();
//     console.log(grand);
//     if (Meteor.subscribe("orders.status").ready()) {
//       const status = Orders.find().fetch();
//       console.log(status);
//       if (Meteor.subscribe("product.total.price").ready()) {
//         const productTotal = Orders.find().fetch();
//         console.log(productTotal);
//         onData(null, {
//           grand,
//           status,
//           productTotal
//         });
//       }
//     }
//   }
// }

// registerComponent("Analytics", Analytics, [composeWithTracker(composer)]);

// export default compose(
//   composeWithTracker(composer)
// )(Analytics);

registerComponent("Analytics", Analytics);

export default Analytics;
