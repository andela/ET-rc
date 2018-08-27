import React, { Component } from "react";
import debounce from "lodash/debounce";
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
      counter: 2,

      shopRating: 0
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount = () => {
    const { shopInfo, shopProducts, shopReviews, shopId } = this.props;
    this.setState({
      shopInfo,
      products: shopProducts,
      reviews: shopReviews,
      processing: false,
      endOfItemsReached: false
    });
    Meteor.call("shop.average.rating", shopId, (_, shopRating) => this.setState({ shopRating }));
  }
  // wait for 3 seconds before calling
  handlePageChange() {
    const { getReviews } = this.props;
    const offset = (this.state.counter - 1) * 5;
    // we've reached the end of the items;
    if (!getReviews(offset).length) return this.setState({ endOfItemsReached: true });
    const reviews = [...this.state.reviews, ...getReviews(offset)];
    this.setState({ reviews, processing: false, counter: this.state.counter + 1 });
  }

  renderModal = () => {
    if (!this.state.reviews) return; // you probably want to add a notification here;
    this.setState({ wantsToSeeModal: true });
  }

  pushUpToState = (review) => this.setState({ reviews: [review, ...this.state.reviews ] });

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
                <ShopReviewList
                  reviews={reviews}
                  handlePageChange={this.handlePageChange}
                  pushNewCommentToState={this.pushUpToState}
                />
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

