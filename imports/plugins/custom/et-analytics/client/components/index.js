import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import ProductList from "./ProductList";

/**
 * Renders the Analytics component
 * @class
 */
class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.fetchTopTenProducts = this.fetchTopTenProducts.bind(this);
  }

  componentDidMount() {
    this.fetchTopTenProducts();
  }

  /**
   * Fetch top ten products
   */
  fetchTopTenProducts() {
    Meteor.call("analytics/topTenProducts", (error, response) => {
      if (error) {
        return;
      }
      this.setState({ products: response });
    });
  }

  render() {
    const { products } = this.state;
    if (products.length < 1) {
      return (
        <div className="text-center">
          <h4><strong>No product has been ordered</strong></h4>
        </div>
      );
    }

    return (
      <div>
        <h4 className="text-center mt">
          <strong>Top Ten Selling Products</strong>
        </h4>
        <ProductList products={products} />
      </div>
    );
  }
}

export default Analytics;
