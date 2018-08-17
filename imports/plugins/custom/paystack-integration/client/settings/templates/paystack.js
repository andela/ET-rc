import { Template } from "meteor/templating";
import { PaystackSettingsFormContainer } from "../containers";
import "./paystack.html";

Template.paystackSettings.helpers({
  PaystackSettings() {
    return {
      component: PaystackSettingsFormContainer
    };
  }
});
