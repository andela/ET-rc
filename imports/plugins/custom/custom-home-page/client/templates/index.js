import { Components } from "/imports/plugins/core/components/lib";
import { Template } from "meteor/templating";
import "./landing.html";

Template.etLanding.helpers({
  LandingComponent() {
    return Components.EtLanding;
  }
});
