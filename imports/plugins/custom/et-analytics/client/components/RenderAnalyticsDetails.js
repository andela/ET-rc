import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/styles.less";

/**
  * Renders analytics details
 */
const RenderAnalyticsDetails = ({ grand, completed, canceled, productTotal, processing }) => (
  <div className="row container card-list">
    <div className="col-md-3 card-container">
      <div className="card">
        <div className="title">Total items purchased</div>
        <div className="value">{productTotal}</div>
      </div>
    </div>
    <div className="col-md-3 card-container">
      <div className="card">
        <div className="title">Total Earnings</div>
        <div className="value" style={{ color: "green" }}>&#x20A6; {grand}</div>
      </div>
    </div>
    <div className="col-md-6 card-container">
      <div className="card">
        <div className="card-body">
          <div className="col-sm-4 p-1 border-right-blue-grey border-right-lighten-5 card-segment">
            <div className="title">Orders Completed</div>
            <div className="value" style={{ color: "green" }}>{completed}</div>
          </div>
          <div className="col-sm-4 p-1 border-right-blue-grey border-right-lighten-5 card-segment">
            <div className="title">Orders Processing</div>
            <div className="value">{processing}</div>
          </div>
          <div className="col-sm-4 p-1 border-right-blue-grey border-right-lighten-5 card-segment">
            <div className="title">Orders Canceled</div>
            <div className="value" style={{ color: "red" }}>{canceled}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

RenderAnalyticsDetails.propTypes = {
  canceled: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  grand: PropTypes.number.isRequired,
  processing: PropTypes.number.isRequired,
  productTotal: PropTypes.number.isRequired
};

export default RenderAnalyticsDetails;
