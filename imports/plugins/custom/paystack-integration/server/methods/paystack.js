import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Packages } from "/lib/collections";
import { HTTP } from "meteor/http";
import { Reaction, Logger } from "../../../../../../server/api";

const paystackBaseUrl = "api.paystack.co";

Meteor.methods({
  /**
   * Get shop keys
   *
   * @returns {object} result
   */
  "paystack/getShopKeys": () => {
    const { settings } = Packages.findOne({
      name: "paystack",
      shopId: Reaction.getShopId()
    });
    return {
      publicKey: settings.paystack.publicKey,
      secretKey: settings.paystack.secretKey,
      testMode: settings.paystack.testMode
    };
  },
  /**
    * Create a refund
     * @param  {Object} paymentMethod Object holding order payment details
     * @param  {Number} amount The amount to be refunded
     * @return {Object} result
  */
  "paystack/refund/create": (paymentMethod, amount) => {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);

    let result;

    const paystackRefundUrl = `https://${paystackBaseUrl}/refund`;
    const { transactionId } = paymentMethod;
    const { settings } = Packages.findOne({
      name: "paystack",
      shopId: Reaction.getShopId()
    });
    const { secretKey } = settings.paystack;

    try {
      result = HTTP.call("POST", paystackRefundUrl, {
        headers: {
          "Authorization": `Bearer ${secretKey}`,
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          transaction: transactionId,
          amount
        })
      });

      if (result.error) {
        throw new Meteor.Error("There was a problem authorizing paystack connect", result.error);
      }
      return result;
    } catch (error) {
      Logger.error(error);
      result = { error };
    }

    return null;
  },
  /**
    * List refunds
    * @param  {Object} paymentMethod Object holding order payment details
    * @return {Object} result
  */
  "paystack/refund/list": (paymentMethod) => {
    check(paymentMethod, Reaction.Schemas.PaymentMethod);

    let result;

    const { transactionId } = paymentMethod;
    const paystackRefundUrl = (transactionId ? `https://${paystackBaseUrl}/refund?reference=${transactionId}`
      : `https://${paystackBaseUrl}/refund`);

    const { settings } = Packages.findOne({
      name: "paystack",
      shopId: Reaction.getShopId()
    });

    const { secretKey } = settings.paystack;

    try {
      result = HTTP.call("GET", paystackRefundUrl, {
        headers: {
          "Authorization": `Bearer ${secretKey}`,
          "Content-Type": "application/json"
        }
      });

      if (result.error) {
        throw new Meteor.Error("There was a problem authorizing paystack connect", result.error);
      }

      return result;
    } catch (error) {
      Logger.error(error);
      result = { error };
    }

    return null;
  }
});
