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
    const scriptNode = document.getElementById("twitter-wjs");
    if (scriptNode) {
      scriptNode.parentNode.removeChild(scriptNode);
    }
    !(function (data, newScript, id) {
      let file;
      const element = data.getElementsByTagName(newScript)[0];
      const TweetsUrl = /^http:/.test(data.location) ? "http" : "https";
      if (!data.getElementById(id)) {
        file = data.createElement(newScript);
        file.id = id;
        file.src = TweetsUrl + "://platform.twitter.com/widgets.js";
        element.parentNode.insertBefore(file, element);
      }
    }(document, "script", "twitter-wjs"));
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
        <h4>Explore</h4>
        <p>About Us</p>
        <p>Contact Us</p>
        <p>Terms and Conditions</p>
        <p>Return policy</p>
      </div>
    );
    const realPages = (
      <div className="static-pages-feed">
        <h4>Explore</h4>
        {pages && pages.length && pages.map(page => {
          return (
            <p id={page._id}>
              <a onClick={() => this.visitThisPage(page)}>
                {page.pageTitle}
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
            <h4>Twitter Feeds</h4>
            <div>
              <a className="twitter-timeline"
                data-width="300" data-height="400"
                href="https://twitter.com/ETWorld4?ref_src=twsrc%5Etfw"
              >Tweets by ETWorld4</a>
            </div>
          </div>

          <div className="facebook-container">
            <h4>Facebook</h4>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fetworldrc&tabs=timeline&width=400&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1014279048630887"
              width="300" height="400" style={{ border: "none", overflow: "hidden" }}
              scrolling="no" frameBorder="0" allowTransparency="true" allow="encrypted-media"
            />
          </div>

          <div className="social-media">
            <h4>We are here for you</h4>
            <a href="mailto:et.rc.world@gmail.com">
              <i className="fa fa-envelope" />
            </a>
            <a href="https://www.facebook.com/etworldrc/">
              <i className="fa fa-facebook-f" />
            </a>
            <a href="https://twitter.com/ETWorld4">
              <i className="fa fa-twitter" />
            </a>
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
