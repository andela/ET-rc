import { HTTP } from "meteor/http";
import { Meteor } from "meteor/meteor";

const paystackBaseUrl = "api.paystack.co";

export const Paystack = {
  verify(referenceNumber, secretKey, callback) {
    let result;

    const paystackVerificationUrl = `https://${paystackBaseUrl}/transaction/verify/${referenceNumber}`;

    try {
      result = HTTP.call("GET", paystackVerificationUrl, {
        headers: {
          "Authorization": `Bearer ${secretKey}`,
          "Content-Type": "application/json"
        }
      });

      if (result.error) {
        throw new Meteor.Error("There was a problem authorizing paystack connect", result.error);
      }
      callback(null, result);
    } catch (error) {
      callback(result, null);
    }
  }
};
