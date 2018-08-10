import React, { Component } from "react";
import { registerComponent, getHOCs } from "/imports/plugins/core/components/lib";
import Grid from "./Grid";
import Banner from "./Banner";
import Footer from "./Footer/container";

class EtLanding extends Component {
  render() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <Banner />
        <Grid />
        <Footer />
      </div>
    );
  }
}

registerComponent("EtLanding", EtLanding, getHOCs("Products"));
