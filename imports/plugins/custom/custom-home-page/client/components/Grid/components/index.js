import React from "react";
import RenderAlwaysBeenAboutYou from "./AlwaysBeenAboutYou";
import ShopCollectionsLandingGrid from "./RenderGrid";

/**
 * Renders a two sided grid
 *
 * @returns {JSX}
 */
const TwoSideGrid =  () => (
  <div
    style={{
      height: "450px",
      width: "100%",
      marginTop: "20px",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingBottom: "5%"
    }}
    id="shop-now"
  >
    <RenderAlwaysBeenAboutYou />
    <ShopCollectionsLandingGrid />
  </div>

);

export default TwoSideGrid;
