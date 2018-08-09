import React from "react";
import { Components, getComponent } from "/imports/plugins/core/components/lib";
import TwoSidedGrid from './components/'
import "./index.css";

console.log(Components.Products)

const Products = getComponent("Products")

const Grid = () => {
  return (
    <div style={{ minHeight: '600px', width: "100%"}}>
      <TwoSidedGrid />
      <Products />
    </div>
  );
};

export default Grid;
