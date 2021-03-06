import React from "react";
import "./index.css";

/**
 * Renders the banner of the landing page
 *
 * @return {Component|JSX} the banner of the landing page
 */
const Banner = () => {
  const shopNow = () => {
    if (window.location.href === "#shop-now") {
      window.location.href = "";
      window.location.href = "#shop-now";
    } else {
      window.location.href = "#shop-now";
    }
  };

  return (
    <div className="container-fluid">
      <div id="myCarousel" className="carousel slide" data-ride="carousel">

        <div className="carousel-inner">
          <div className="item active">
            <div className="header-overlay" />
            <img src="/images/banner_1.jpg" alt="Chicago" style={{ width: "100%" }} />
            <div className="carousel-caption">
              <h2>Shop To Get What You Love</h2> <br />
              <button
                className="btn btn-lg shop-now"
                onClick={shopNow}
              >
                Shop Now
              </button>
            </div>
          </div>

          <div className="item">
            <div className="header-overlay" />
            <img src="/images/banner_4.jpg" alt="Chicago" style={{ width: "100%" }} />
            <div className="carousel-caption">
              <h2>Shop for Electronics You Love</h2> <br />
              <button
                className="btn btn-lg shop-now"
                onClick={shopNow}
              >
                Shop Now
              </button>
            </div>
          </div>

          <div className="item">
            <div className="header-overlay" />
            <img src="/images/banner_2.jpg" alt="New york" style={{ width: "100%" }} />
            <div className="carousel-caption">
              <h2>The New Standard Electronics</h2> <br />
              <button
                className="btn btn-lg shop-now"
                onClick={shopNow}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left fa fa-arrow-left " />
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#myCarousel" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right fa fa-arrow-right" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Banner;
