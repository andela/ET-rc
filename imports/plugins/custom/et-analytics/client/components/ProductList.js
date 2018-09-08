import React from "react";
import PropTypes from "prop-types";
import ProductRow from "./ProductRow";
import "./index.less";

/**
 * React component that renders product list
 *
 * @param {Object} props Component props
 */
const ProductList = ({ products }) => {
  const productList = products
    .map((product, index) => ({ id: index + 1, ...product }))
    .map(product => (
      <ProductRow key={product.id} product={product} />
    ));

  return (
    <div className="et-analytics-container mt">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity Sold</th>
            <th scope="col">Total Amount Made (&#x20A6;)</th>
            <th scope="col">First Sold</th>
            <th scope="col">Last Sold</th>
          </tr>
        </thead>
        <tbody>
          {productList}
        </tbody>
      </table>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ProductList;
