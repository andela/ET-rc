import React from "react";
import { getComponent } from "/imports/plugins/core/components/lib";
import TwoSidedGrid from "./components/";
import RenderAdvantageOfApplication from "./components/AdvantageOfApplication";
import VendOnEtWorld from "./components/VendOnET";
import "./index.css";


const Products = getComponent("Products");

/**
 * Grid of products on the shop
 */
const Grid = () => {
  return (
    <div style={{ minHeight: "650px", width: "100%"  }}>
      <RenderAdvantageOfApplication />
      <TwoSidedGrid />
      <Products />
      <VendOnEtWorld />
    </div>
  );
};

export default Grid;
