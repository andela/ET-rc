import React, { Component } from "react";
import PropTypes from "prop-types";
import { Reaction } from "/client/api";
import { TextField, Button, IconButton, SortableTableLegacy } from "@reactioncommerce/reaction-ui";
import ProductGridContainer from "/imports/plugins/included/product-variant/containers/productGridContainer";
import { accountsTable } from "../helpers";

class SearchModal extends Component {
  static propTypes = {
    accounts: PropTypes.array,
    handleAccountClick: PropTypes.func,
    handleChange: PropTypes.func,
    handleClick: PropTypes.func,
    handleFilter: PropTypes.func,
    handleSort: PropTypes.func,
    handleTagClick: PropTypes.func,
    handleToggle: PropTypes.func,
    products: PropTypes.array,
    siteName: PropTypes.string,
    tags: PropTypes.array,
    unmountMe: PropTypes.func,
    value: PropTypes.string,
    vendors: PropTypes.array

  }

  renderSearchInput() {
    return (
      <div className="rui search-modal-input">
        <label data-i18n="search.searchInputLabel">Search {this.props.siteName}</label>
        <i className="fa fa-search search-icon" />
        <TextField
          className="search-input"
          textFieldStyle={{ marginBottom: 0 }}
          onChange={this.props.handleChange}
          value={this.props.value}
        />
        <Button
          className="search-clear"
          i18nKeyLabel="search.clearSearch"
          label="Clear"
          containerStyle={{ fontWeight: "normal" }}
          onClick={this.props.handleClick}
        />
      </div>
    );
  }

  renderSearchTypeToggle() {
    if (Reaction.hasPermission("admin")) {
      return (
        <div className="rui search-type-toggle">
          <div
            className="search-type-option search-type-active"
            data-i18n="search.searchTypeProducts"
            data-event-action="searchCollection"
            data-event-value="products"
            onClick={() => this.props.handleToggle("products")}
          >
            Products
          </div>
          {Reaction.hasPermission("accounts") &&
            <div
              className="search-type-option"
              data-i18n="search.searchTypeAccounts"
              data-event-action="searchCollection"
              data-event-value="accounts"
              onClick={() => this.props.handleToggle("accounts")}
            >
              Accounts
            </div>
          }
        </div>
      );
    }
  }

  renderProductSearchTags() {
    return (
      <div className="rui search-modal-tags-container">
        <p className="rui suggested-tags" data-i18n="search.suggestedTags">Suggested tags</p>
        <div className="rui search-tags">
          {this.props.tags.map((tag) => (
            <span
              className="rui search-tag"
              id={tag._id} key={tag._id}
              onClick={() => this.props.handleTagClick(tag._id)}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    );
  }

  handleFilter(e, name) {
    e.preventDefault();
    if (e.target.value === "0") return this.props.handleFilter();
    if (name === "shopId") return this.props.handleFilter({ shopId: e.target.value });
    const query = {};
    const obj = JSON.parse(e.target.value);
    query.$or = [{ "price.min": { $gt: obj.min } }, { "price.max": { $lt: obj.max } }];
    this.props.handleFilter(query);
  }

  renderFilterFields() {
    return (
      <div style={{ display: "inline-block", margin: "10px" }}>
        <span style={{ color: "#fff" }}>Filter By</span>
        <select id="price" onChange={(e) => this.handleFilter(e, "price")} style={{ margin: "5px", width: "126px", height: "33px" }}>
          { this.renderPriceRanges() }
          <option value="0">All</option>
        </select>
        <select id="vendor" onChange={(e) => this.handleFilter(e, "shopId")} style={{ margin: "5px", width: "126px", height: "33px" }}>
          { this.renderVendors() }
          <option value="0">All Vendors</option>
        </select>
      </div>
    );
  }

  renderPriceRanges = () => {
    const { products }  = this.props;
    if (!products || !products.length) return null;
    const MaxpriceMap = products.map(product => product.price.max);
    const MinPriceMap = products.map(product => product.price.min);
    const priceMap = [ ...MaxpriceMap, ...MinPriceMap].sort((a, b) => a - b);
    if (priceMap.length === 2) return [<option key={`option-${1}`} value={JSON.stringify({ min: priceMap[0], max: priceMap[1] })}>&#8358;{`${Number.parseFloat(priceMap[0]).toFixed(2)}`} - &#8358;{`${Number.parseFloat(priceMap[1]).toFixed(2)}`}</option>];
    const highestPrice = priceMap[priceMap.length - 1 ];
    const [lowestPrice] = priceMap;
    const multiplier = (highestPrice - lowestPrice) / 5;
    const prices = [];
    for (let i = 1; i <= 5; i++) {
      const pricesItem = {};
      if (!prices.length) {
        pricesItem.min = lowestPrice;
        pricesItem.max = lowestPrice + (i * multiplier);
        prices.push(pricesItem);
        continue;
      }
      pricesItem.min = prices[prices.length - 1].max;
      pricesItem.max = lowestPrice + (i * multiplier);
      prices.push(pricesItem);
    }

    return prices.map((priceObject, index) => <option key={`option-${index}`} value={JSON.stringify(priceObject)}>&#8358;{`${Number.parseFloat(priceObject.min).toFixed(2)}`} - &#8358;{`${Number.parseFloat(priceObject.max).toFixed(2)}`}</option>);
  }

  renderVendors = () => this.props.vendors.map((shop) => <option key={`vendor-${shop._id}`} value={shop._id}>{shop.name}</option>)

  handleSort = (e) => {
    e.preventDefault();
    if (e.target.value === "0") return this.props.handleSort();
    this.props.handleSort(JSON.parse(e.target.value));
  }


  renderSortFields() {
    return (
      <div style={{ display: "inline-block", margin: "10px" }}>
        <span style={{ color: "#fff" }}>Sort By</span>
        <select
          id="sort-type"
          onChange={this.handleSort}
          style={{ margin: "5px", width: "126px", height: "33px" }}
        >
          <option value={JSON.stringify({ createdAt: -1 })}>Newest</option>
          <option value={JSON.stringify({ "price.max": 1 })}>Lowest Price</option>
          <option value={JSON.stringify({ "price.max": -1 })}>Highest Price</option>
          <option value="0">None</option>
        </select>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="rui search-modal-close"><IconButton icon="fa fa-times" onClick={this.props.unmountMe} /></div>
        <div className="rui search-modal-header">
          {this.renderSearchInput()}
          {this.renderSearchTypeToggle()}
          {this.props.tags.length > 0 && this.renderProductSearchTags()}
        </div>

        <div style={{ position: "relative", marginTop: this.props.tags.length ? "-26px" : "-110px", textAlign: "center", background: "#666666cc" }}>
          {this.renderFilterFields()}
          {this.renderSortFields()}
        </div>

        <div className="rui search-modal-results-container">
          {this.props.products.length > 0 &&
            <ProductGridContainer
              products={this.props.products}
              unmountMe={this.props.unmountMe}
              isSearch={true}
            />
          }
          {this.props.accounts.length > 0 &&
            <div className="data-table">
              <div className="table-responsive">
                <SortableTableLegacy
                  data={this.props.accounts}
                  columns={accountsTable()}
                  onRowClick={this.props.handleAccountClick}
                />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default SearchModal;
