import { Components } from "/imports/plugins/core/components/lib";
import { Template } from "meteor/templating";
import "./index.html";

Template.shopReview.helpers({
  ShopReviewComponent() {
    return Components.ShopReviewComponent;
  }
});
