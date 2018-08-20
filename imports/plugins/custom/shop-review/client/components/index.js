import React, { Component } from "react";
import { registerComponent } from "/imports/plugins/core/components/lib";
import { Router } from "/client/modules/router";
import RenderShopDetails from "./RenderShopDetails";
import RenderShopProducts from "./RenderShopProducts";

class ShopLandingComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const param = Router.getParam("id")
    console.log(param);
  }
    render = () => (
      <div
        style={{
          height: "100%",
          width: "100%"
        }}
      >
        <RenderShopDetails />
        <div style={{ height: "60%", marginTop: "5%" }}>
          <RenderShopProducts />
        </div>
      </div>
    )
}

registerComponent("ShopReviewComponent", ShopLandingComponent);
