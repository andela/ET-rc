import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { PackageConfig } from "/lib/collections/schemas/registry";
import { registerSchema } from "@reactioncommerce/reaction-collections";

export const PaystackPackageConfig = new SimpleSchema([
  PackageConfig, {
    "settings.paystack.mode": {
      type: Boolean,
      defaultValue: true
    },
    "settings.paystack.publickey": {
      type: String,
      label: "API Public Key",
      optional: true
    },
    "settings.paystack.secretkey": {
      type: String,
      label: "API secret key",
      optional: true
    },
    "settings.paystack.testMode": {
      type: Boolean,
      label: "API test mode",
      optional: true
    }
  }
]);

registerSchema("PaystackPackageConfig", PaystackPackageConfig);

export const PaystackPayment = new SimpleSchema({
  payerName: {
    type: String,
    label: "Cardholder name",
    optional: true
  },
  payerEmail: {
    type: String,
    label: "Cardholder email",
    optional: true
  }
});

registerSchema("PaystackPayment", PaystackPayment);
