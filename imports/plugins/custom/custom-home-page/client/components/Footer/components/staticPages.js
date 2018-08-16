import React, { Component } from "react";
import PropTypes from "prop-types";
import { registerComponent } from "/imports/plugins/core/components/lib";
import { Reaction } from "/lib/api";
import "../stylesheet/index.css";

/**
 * Renders the footer of the landing page
 *
 * @return {Component|JSX} the footer of the landing page
 */
class Footer extends Component {
  static propTypes = {
    pages: PropTypes.array
  };

  state = {}

  componentDidMount = () => {
    this.setState({ pages: this.props.pages });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.pages.length === prevProps.pages.length) return;
    return this.setState({ pages: this.props.pages });
  }

  visitThisPage(page) {
    return Reaction.Router.go(`/info/${page.pageURLAddress}`);
  }

  renderStaticPagesComponent() {
    const { pages } = this.state;
    const fakePages = (
      <div className="static-pages-feed">
        <h4>EXPLORE</h4>
        <p>About Us</p>
        <p>Contact Us</p>
        <p>Terms and Conditions</p>
        <p>Return policy</p>
      </div>
    );
    const realPages = (
      <div className="static-pages-feed">
        <h4>EXPLORE</h4>
        { pages && pages.length && pages.map(page => {
          return (
            <p id={page._id}>
              <a onClick={() => this.visitThisPage(page)}>
                { page.pageTitle }
              </a>
            </p>
          );
        })}
      </div>);
    const output = pages && pages.length ? realPages : fakePages;
    return (
      output
    );
  }

  render() {
    return (
      <div className="footer-content">
        <div className="footer-container">
          {this.renderStaticPagesComponent()}
          <div className="twitter-container">
            <h4>TWEET FEEDS</h4>
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
registerComponent("Footer", Footer);
export default Footer;
