import { Meteor } from "meteor/meteor";
import { Shops } from "/lib/collections";

Meteor.publish("VendorResults", () => Shops.find({}));
