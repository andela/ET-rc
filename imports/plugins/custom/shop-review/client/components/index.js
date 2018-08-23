import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import RenderShopDetails from "./RenderShopDetails";
import RenderShopProducts from "./RenderShopProducts";
import { RenderModal } from "../mixins/modal";
import NotFoundComponent from "../mixins/NotFound";
import ShopReviewList from "../components/RenderShopReviews";


export default class ShopLandingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopInfo: {},
      products: [],
      reviews: [],
      shopRating: 0
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      shopInfo: this.props.shopInfo,
      products: this.props.shopProducts,
      reviews: this.props.shopReviews
    });
    const { shopId } = this.props;
    Meteor.call("shop.average.rating", shopId, (_, shopRating) => this.setState({ shopRating }));
  }

  handlePageChange(pageNo) {
    const { getReviews } = this.props;
    const offset = (pageNo - 1) * 5;
    this.setState({ reviews: getReviews(offset) });
  }

  renderModal = () => {
    if (!this.state.reviews) return; // you probably want to add a notification here;
    this.setState({ wantsToSeeModal: true });
  }


  render() {
    const { shopProducts } = this.props;
    const { shopRating, shopInfo, reviews } = this.state;
    return (
      <div
        style={{
          height: "100%",
          width: "100%"
        }}
      >
        { !shopInfo && <NotFoundComponent /> }
        { shopInfo && (
          <div style={{ width: "100%", height: "100%" }}>
            <RenderShopDetails shopRating={shopRating} shop={this.state.shopInfo} reviews={reviews} renderModal={this.renderModal}/>
            <div style={{ height: "60%", marginTop: "5%" }}>
              <RenderShopProducts products={shopProducts} />
            </div>
            { this.state.wantsToSeeModal ?
              <RenderModal
                closeModal={() => { this.setState({ wantsToSeeModal: false });}}
              >
                <ShopReviewList reviews={reviews} handlePageChange={this.handlePageChange} />
              </RenderModal>
              : null
            }
          </div>
        )
        }
      </div>

    );
  }
}

