import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import ProductList from "./ProductList";
import RenderAnalyticsDetails from "./RenderAnalyticsDetails";

/**
 * Renders the Analytics component
 * @class
 */
export default class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productTotal: [],
      status: [],
      grand: 0,
      completed: 0,
      processing: 0,
      canceled: 0,
      totalOrdered: 0,
      products: []
    };
    this.fetchTopTenProducts = this.fetchTopTenProducts.bind(this);
  }

  componentDidMount = () => {
    Meteor.call("grand.total", (error, result) => {
      if (error) {
        return error;
      }
      this.setState({ grand: result[0].grandTotal });
    });
    Meteor.call("orders.status", (error, result) => {
      if (error) {
        return error;
      }
      let completed = 0;
      let processing = 0;
      let canceled = 0;
      for (let i = 0; i < result.length; i += 1) {
        if ((result[i]._id)[0] === "coreOrderItemWorkflow/completed") {
          completed = result[i].status;
        } else if ((result[i]._id)[0] === "coreOrderItemWorkflow/canceled") {
          canceled = result[i].status;
        } else if ((result[i]._id)[0] === "coreOrderItemWorkflow/processing") {
          processing = result[i].status;
        }
      }
      this.setState({ completed, canceled, processing });
    });
    Meteor.call("product.total.price", (error, result) => {
      if (error) {
        return error;
      }
      this.setState({ productTotal: result });
    });
    Meteor.call("orders.total", (error, result) => {
      if (error) {
        return error;
      }
      this.setState({ totalOrdered: result[0].total });
    });
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
    const {
      grand, completed, canceled,
      processing, totalOrdered, products
    } = this.state;

    return (
      <div>
        <RenderAnalyticsDetails
          grand={grand}
          completed={completed}
          processing={processing}
          canceled={canceled}
          totalOrdered={totalOrdered}
        />
        {products.length < 1
          ?
          <div className="text-center">
            <h4><strong>No product has been ordered</strong></h4>
          </div>
          :
          <div>
            <h4 className="text-center mt">
              <strong>Top Ten Selling Products</strong>
            </h4>
            <ProductList products={products} />
          </div>}
      </div>
    );
  }
}
