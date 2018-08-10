import { StaticPages } from "/lib/collections";
import { Meteor } from "meteor/meteor";

/**
 * Static Pages
 */
Meteor.publish("StaticPagesServer", function () {
  return StaticPages.find({});
});
