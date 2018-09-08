/* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "ET-rc Actionable analytics",
  name: "et-analytics",
  autoEnable: true,
  settings: {},
  registry: [{
    route: "/analytics",
    template: "analytics",
    name: "analytics",
    provides: ["userAccountDropdown"],
    label: "Analytics",
    icon: "fa fa-bar-chart-o"
  }]
});
