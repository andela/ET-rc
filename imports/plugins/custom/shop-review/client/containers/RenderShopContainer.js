import { compose, withProps } from "recompose";
import { registerComponent, composeWithTracker } from "/imports/plugins/core/components/lib";
import { Reaction } from "/client/api";
import { Meteor } from "meteor/meteor";
import { Reviews } from "../../../products-review/lib/collections";
import { Products, Shops } from "../../../../../../lib/collections";

import ShopLandingComponent from "../components";

const handlers = {
  getReviews(skip) {
    const shopId = Reaction.Router.getParam("id");
    return Reviews.find({ destination: shopId }, { limit: 5, skip }).fetch();
  }
};

function composer(props, onData) {
  const shopSlug = Reaction.Router.getParam("id");
  const prodSub = Meteor.subscribe("shop.details", shopSlug);
  let shopId = "";
  if (prodSub.ready()) {
    const shopInfo = Shops.find({ _id: shopSlug }).fetch()[0];
    shopId = shopInfo ? shopInfo._id : shopSlug;
    if (Meteor.subscribe("shop.products", shopId).ready()) {
      const shopProducts = Products.find({ shopId: shopId }).fetch();
      if (Meteor.subscribe("shop.reviews", shopId).ready()) {
        const shopReviews = Reviews.find({ destination: shopId }, { limit: 5 }).fetch();
        onData(null, {
          shopReviews,
          shopProducts,
          shopInfo,
          shopId: shopSlug
        });
      }
    }
  }
}

registerComponent("ShopReviewComponent", ShopLandingComponent, [composeWithTracker(composer), withProps(handlers)]);

export default compose(
  composeWithTracker(composer),
  withProps(handlers)
)(ShopLandingComponent);

