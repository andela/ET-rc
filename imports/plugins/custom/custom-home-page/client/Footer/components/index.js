import React, { Component } from "react";
import { registerComponent } from "/imports/plugins/core/components/lib";
import "./index.css";

class EtLandingFooter extends Component {
  render() {
    return (
      <div>
      This is blessings page. check it out
      </div>
    );
  }
}

// Please dont touch this
registerComponent("LandingFooter", EtLandingFooter);

