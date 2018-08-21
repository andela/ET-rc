import React, { Component } from "react";
import { registerComponent, composeWithTracker } from "/imports/plugins/core/components/lib";
import { Router } from "/client/modules/router";
import { Reaction } from "/client/api";
import RenderShopDetails from "./RenderShopDetails";
import RenderShopProducts from "./RenderShopProducts";
import { Meteor } from "meteor/meteor";
import { Products, Shops } from "../../../../../../lib/collections";
import { Reviews } from "../../lib/collections";

class ShopLandingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopInfo: {},
      products: [],
      reviews: []
    };
  }

  componentDidMount = () => {
    this.setState({
      shopInfo: this.props.shopInfo,
      products: this.props.shopProducts,
      reviews: this.props.shopReviews
    });
  }
  render() {
    const products = this.state.products;
    const reviews = this.state.reviews;
    return (
      <div
        style={{
          height: "100%",
          width: "100%"
        }}
      >
        <RenderShopDetails shop={this.state.shopInfo} />
        <div style={{ height: "60%", marginTop: "5%" }}>
          <RenderShopProducts products={products} />
        </div>
      </div>
    );
  }
}


function composer(props, onData) {
  const shopSlug = Reaction.Router.getParam("id");
  const prodSub = Meteor.subscribe("shop.details", shopSlug);
  let shopId = "";
  if (prodSub.ready()) {
    const shopInfo = Shops.find({ slug: shopSlug }).fetch()[0];
    shopId = shopInfo._id;
    if (Meteor.subscribe("shop.products", shopId).ready()) {
      const shopProducts = Products.find({ shopId: shopId }).fetch();
      if (Meteor.subscribe("shop.reviews", shopId).ready()) {
        const shopReviews = Reviews.find({ shopId: shopId }).fetch();
        onData(null, {
          shopReviews: shopReviews,
          shopProducts,
          shopInfo
        });
      }
    }
  }
}

registerComponent("ShopReviewComponent", ShopLandingComponent, composeWithTracker(composer));
export default composeWithTracker(composer)(ShopLandingComponent);
