import { Components } from "/imports/plugins/core/components/lib";
import { Template } from "meteor/templating";
import "./footer.html";

Template.etLandingFooter.helpers({
  LandingFooter() {
    return Components.LandingFooter;
  }
});
