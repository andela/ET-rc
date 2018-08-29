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
    handleTagClick: PropTypes.func,
    handleToggle: PropTypes.func,
    products: PropTypes.array,
    siteName: PropTypes.string,
    tags: PropTypes.array,
    unmountMe: PropTypes.func,
    value: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      sortby: "newest",
      filterParams: "",
      filterType: ""
    };
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

  handleFilter(event, type) {
    event.preventDefault();
    this.setState(() => ({ filterType: type, filterParams: event.target.value }));
    console.log(this.state.filterType, this.state.filterParams);
  }

  renderFilterFields() {
    return (
      <div style={{ display: "inline-block", margin: "10px" }}>
        <span style={{ color: "#fff" }}>Filter By</span>
        <select id="price" onChange={() => this.handleFilter(event, "price")} style={{ margin: "5px", width: "126px", height: "33px" }}>
          <option value="0">Any Price</option>
          <option value="0-99">0 - &#x20a6;99</option>
          <option value="100-999">&#x20a6;100 - &#x20a6;999</option>
          <option value="1000-9999">&#x20a6;1000 - &#x20a6;9999</option>
          <option value="10000-99999">&#x20a6;10000 - &#x20a6;99999</option>
          <option value="100000-999999">&#x20a6;100000 - &#x20a6;999999</option>
        </select>
        <select id="vendor" onChange={() => this.handleFilter(event, "vendor")} style={{ margin: "5px", width: "126px", height: "33px" }}>
          <option value="0">All Vendors</option>
        </select>
      </div>
    );
  }

  handleSort(event) {
    event.preventDefault();
    this.setState(() => ({ sortby: event.target.value }));
    console.log(this.state.sortby);
  }


  renderSortFields() {
    return (
      <div style={{ display: "inline-block", margin: "10px" }}>
        <span style={{ color: "#fff" }}>Sort By</span>
        <select
          id="sort-type"
          value={this.state.sortby}
          onChange={() => this.handleSort(event)}
          style={{ margin: "5px", width: "126px", height: "33px" }}
        >
          <option value="newest">Newest</option>
          <option value="lowest">Lowest Price</option>
          <option value="highest=">Highest Price</option>
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

        <div style={{ position: "relative", marginTop: "-110px", textAlign: "center", background: "#666666cc" }}>
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
