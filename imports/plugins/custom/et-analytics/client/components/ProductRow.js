import React from "react";
import PropTypes from "prop-types";

/**
 * React component that renders each product row
 *
 * @param {props} props Component props
 */
const ProductRow = ({ product }) => {
  return (
    <tr>
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>{product.quantitySold}</td>
      <td>{product.total}</td>
      <td>{product.firstPurchaseDate.toDateString()}</td>
      <td>{product.lastPurchaseDate.toDateString()}</td>
    </tr>
  );
};

ProductRow.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductRow;
