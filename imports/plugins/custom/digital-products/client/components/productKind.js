import React, { Component } from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import axios from "axios";
import { Reaction } from "/client/modules/core";
import { Logger } from "/client/api";
import { ReactionProduct } from "/lib/api";

class ProductKind extends Component {
  state = {
    productKind: "physical",
    uploading: false,
    uploadSuccess: false,
    uploadError: false,
    productURL: "",
    fileSizeOver: false,
    uploadProgress: 0
  };

  componentDidMount() {
    const productId = ReactionProduct.selectedProductId();
    const checkDigitalProduct = document.getElementById("digitalProduct");
    Meteor.call("fetchDigitalProduct", productId, (err, product) => {
      if (err) {
        Logger.error("Fetching product failed");
        return err;
      }
      if (product.isDigital) {
        this.setState({
          productURL: product.productUrl,
          productKind: "digital"
        });
        checkDigitalProduct.checked = true;
      }
      if (product.title) {
        checkDigitalProduct.disabled = true;
      }
    });
  }

  handleChange = () => {
    const checkDigitalProduct = document.getElementById("digitalProduct");

    this.setState({
      productKind: checkDigitalProduct.checked ? "digital" : "physical"
    });

    const productDetails = {
      uploadSuccess: false,
      productId: ReactionProduct.selectedProductId(),
      isDigital: checkDigitalProduct.checked
    };

    productDetails.isDigital = checkDigitalProduct.checked;
    window.productKind = checkDigitalProduct.checked ? "digital" : "physical";

    Meteor.call("addDigitalProduct", productDetails, (err) => {
      if (err) {
        Logger.error("Inserting digital product failed");
      }
    });
  }

  handleFileSize = (event) => {
    event.preventDefault();
    const uploadFile = document.getElementById("uploadFile");
    this.setState({
      fileSizeOver: (this.refs.file.files[0].size > 52428800) ? true : false
    });
    uploadFile.disabled = (this.refs.file.files[0].size < 52428800) ? false : true;
    uploadFile.style.backgroundColor = (this.refs.file.files[0].size < 52428800) ? "#5cde86" : "#dddddd";
    uploadFile.style.cursor = (this.refs.file.files[0].size < 52428800) ? "pointer" : "not-allowed";
    uploadFile.style.color = (this.refs.file.files[0].size < 52428800) ? "white" : "grey";
  }

  handleUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.refs.file.files[0]);
    formData.append("upload_preset", "wi9ctqvg");
    return axios({
      method: "post",
      url: "https://api.cloudinary.com/v1_1/dqsmurjpg/image/upload",
      data: formData,
      withCredentials: false,
      onUploadProgress: (progress) => {
        this.setState({
          uploading: true,
          uploadSuccess: false,
          uploadError: false
        });
        const uploadprogress = Math.floor((progress.loaded * 100) / progress.total);
        this.setState({
          uploadProgress: uploadprogress
        });
      }
    }).then((response) => {
      const url = `${response.data.secure_url.slice(0, 50)}fl_attachment/${response.data.secure_url.slice(50)}`;
      this.setState({
        uploadSuccess: true,
        uploading: false,
        uploadError: false,
        productURL: url
      });

      const productDetails = {
        uploadSuccess: true,
        productId: ReactionProduct.selectedProductId(),
        isDigital: true,
        productUrl: url
      };

      Meteor.call("addDigitalProduct", productDetails, (err) => {
        if (err) {
          Logger.error("Error inserting product");
        }
      });
    })
      .catch((err) => {
        Logger.error(`Upload failed ${err}`);
        this.setState({
          uploadSuccess: false,
          uploading: false,
          uploadError: true,
          productUrl: ""
        });
      });
  }

  render() {
    const { editable } = this.props;
    if (!Reaction.hasAdminAccess()) {
      return null;
    }
    return (
      <div>
        <input
          style={{
            marginBottom: "10px",
            position: "relative"
          }}
          id="digitalProduct"
          type="checkbox"
          name="digital"
          value="digital"
          ref="productKind"
          onChange={this.handleChange}
        /> Digital Product
        <br />
        {this.state.productKind === "digital" && editable &&
          <div>
            <form onSubmit={this.handleUpload} style={{ display: "flex" }}>
              <input
                ref="file"
                type="file"
                accept=".jpg, .jpeg, .png, .pdf"
                style={{ width: "50%", marginBottom: "10px", height: "30px", position: "relative", left: "0px" }}
                className="form-control-file"
                onChange={this.handleFileSize}
              />
              <button value="upload" type="submit"
                id="uploadFile"
                style={{ height: "30px", marginLeft: "10px",
                  cursor: "not-allowed", color: "black", backgroundColor: "#dddddd", border: "1px", borderColor: "grey" }}
                disabled
              >
                {this.state.uploading && <i className="fa fa-spinner fa-spin" />}
                &nbsp;Upload
              </button>
              <span style={{ marginTop: "6px", marginLeft: "5px" }}>{this.state.uploadProgress}%</span>
            </form>
            {this.state.uploadSuccess && <label style={{ color: "green" }}>Success!</label>}
            {this.state.uploadError && <label style={{ color: "red" }}>Error Uploading your file</label>}
            {this.state.fileSizeOver && <label style={{ color: "red" }}>The file should not be more than 50MB</label>}
          </div>
        }
        {(this.state.productURL) &&
          <div style={{ marginBottom: "15px" }} >
            <a ref="productUrl" style={{ color: "#7e3794" }}
              href={this.state.productURL} target="_blank"
            >
              <i className="fa fa-eye" aria-hidden="true" /> Preview</a>
          </div>}
      </div>
    );
  }
}

ProductKind.propTypes = {
  editable: PropTypes.bool
};

export default ProductKind;
