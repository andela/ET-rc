import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import CustomButton from "/imports/plugins/custom/shop-review/client/mixins/buttons";
import { Reaction } from "/client/api";
import { Components, registerComponent } from "@reactioncommerce/reaction-components";

class ProductMetadata extends Component {
  get metafields() {
    return this.props.metafields || this.props.product.metafields;
  }

  get showEditControls() {
    return this.props.product && this.props.editable;
  }

  renderEditButton() {
    if (this.showEditControls) {
      return (
        <span className="edit-button">
          <Components.EditContainer
            data={this.props.product}
            disabled={this.props.editable === false}
            editTypes={["edit"]}
            editView="ProductAdmin"
            field="metafields"
            i18nKeyLabel="productDetailEdit.productSettings"
            label="Product Settings"
            permissions={["createProduct"]}
            {...this.props.editContainerProps}
          />
        </span>
      );
    }

    return null;
  }

  render() {
    if (Array.isArray(this.metafields) && this.metafields.length > 0) {
      const headerClassName = classnames({
        "meta-header": true,
        "edit": this.showEditControls
      });

      return (
        <div className="pdp product-metadata">
          <h3 className={headerClassName}>
            <Components.Translation defaultValue="Details" i18nKey="productDetail.details" />
            {this.renderEditButton()}
          </h3>
          <Components.Metadata editable={false} metafields={this.metafields} />
          <CustomButton
            style={{
              marginTop: "20px",
              position: "relative",
              width: "160px",
              backgroundColor: "white",
              borderRadius: "0px",
              borderColor: "white",
              color: "#6C3483",
              height: "40px"
            }}
            name="View Shop"
            handleClick={() => { Reaction.Router.go(`/display/shop/${this.props.product.shopId}`);}}
          />
        </div>
      );
    }

    return null;
  }
}

ProductMetadata.propTypes = {
  editContainerProps: PropTypes.object,
  editable: PropTypes.bool,
  metafields: PropTypes.arrayOf(PropTypes.object),
  product: PropTypes.object
};

registerComponent("ProductMetadata", ProductMetadata);

export default ProductMetadata;
