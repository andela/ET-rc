import React, { Component } from "react";
// import { Meteor } from "meteor/meteor";
// import * as Collections from "/lib/collections";
import "./index.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer-content">
        <div className="footer-container">
          <div className="static-pages-feed">
            <h4>Explore</h4>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Terms and Conditions</p>
            <p>Return policy</p>
          </div>
          <div className="twitter-container">
            <h4>Tweet Feeds</h4>
            <div>Tweet</div>
          </div>
        </div>
        <div className="footer-end">
          <p>&#9728; Made in Big Apple, Epic Towers by ET-Team &copy; 2018</p>
        </div>
      </div>
    );
  }
}

export default Footer;
