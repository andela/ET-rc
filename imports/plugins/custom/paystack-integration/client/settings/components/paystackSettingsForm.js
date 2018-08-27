import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { TextField, Translation, Checkbox, Switch } from "/imports/plugins/core/ui/client/components";

/**
 * Renders the Paystack setting form on the action bar
 * @class PaystackSettingsForm
 */
class PaystackSettingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        publicKey: props.settings.publicKey,
        support: props.settings.support,
        secretKey: props.settings.secretKey,
        testMode: props.settings.testMode
      },
      checkbox: {
        "Authorize": _.includes(props.settings.support, "Authorize"),
        "De-authorize": _.includes(props.settings.support, "De-authorize"),
        "Capture": _.includes(props.settings.support, "Capture"),
        "Refund": _.includes(props.settings.support, "Refund")
      }
    };
  }

  /**
   * Handle state change
   * @memberof PaystackSettingsForm
   *
   * @param {object<event>} e Event object
   */
  handleStateChange = (e) => {
    const { settings } = this.state;
    settings[e.target.name] = e.target.value;
    this.setState({ settings });
  }

  /**
   * Handle checkbox
   * @memberof PaystackSettingsForm
   *
   * @param {object} event
   * @param {boolean} isInputChecked
   * @param {string} name
   *
   * @returns {object} New checkbox state
   */
  handleCheckBox = (event, isInputChecked, name) => {
    const { checkbox, settings } = this.state;
    checkbox[name] = isInputChecked;
    this.setState({ checkbox });
    if (!_.includes(settings.support, name) && isInputChecked) {
      settings.support.push(name);
      return this.setState({ settings });
    }
    const index = settings.support.indexOf(name);
    settings.support.splice(index, 1);
    return this.setState({ settings });
  }

  /**
   * Handle switch change
   * @memberof PaystackSettingsForm
   *
   * @param {object} event
   * @param {boolean} isInputChecked
   * @param {string} name
   */
  handleSwitch = (event, isInputChecked, name) => {
    const { settings } = this.state;
    settings[name] = !this.state.settings.testMode;
    this.setState({ settings });
  }

  /**
   * Handle form submit
   *
   * @param {object} event
   *
   * @returns Promise
   */
  handleSubmit = (e) => {
    e.preventDefault();
    return this.props.onSubmit(this.state.settings);
  }


  /**
   * Renders PaystackSettingsForm component
   */
  render() {
    const { settings } = this.props;
    const setting = this.state.settings;

    return (
      <div>
        { !settings.publicKey &&
          <div className="alert alert-info">
            <Translation defaultValue="Paystack Credentials" i18nKey="admin.paymentSettings.paystackCredentials" />
          </div>
        }

        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Secret Key"
            name="secretKey"
            type="text"
            onChange={this.handleStateChange}
            value={setting.secretKey}
          />

          <TextField
            label="Public Key"
            name="publicKey"
            type="text"
            onChange={this.handleStateChange}
            value={setting.publicKey}
          />

          <Switch
            label="Api test mode"
            onChange={this.handleSwitch}
            name="testMode"
            checked={setting.testMode}
          />

          <br />
          <label className="control-label" htmlFor="providers">
            <Translation defaultValue="Payment provider supported methods" i18nKey="reaction-payments.paymentSettings.supportedMethodsLabel" />
          </label>
          <br />

          <div>
            <Checkbox
              label="Authorize"
              onChange={this.handleCheckBox}
              name="Authorize"
              checked={this.state.checkbox.Authorize}
            />
          </div>

          <div>
            <Checkbox
              label="De-authorize"
              onChange={this.handleCheckBox}
              name="De-authorize"
              checked={this.state.checkbox["De-authorize"]}
            />
          </div>

          <div>
            <Checkbox
              label="Capture"
              onChange={this.handleCheckBox}
              name="Capture"
              checked={this.state.checkbox.Capture}
            />
          </div>

          <div>
            <Checkbox
              label="Refund"
              onChange={this.handleCheckBox}
              name="Refund"
              checked={this.state.checkbox.Refund}
            />
          </div>


          <button className="btn btn-primary pull-right" type="submit">
            <Translation defaultValue="Save Changes" i18nKey="app.saveChanges" />
          </button>
        </form>

      </div>
    );
  }
}

PaystackSettingsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

export default PaystackSettingsForm;
