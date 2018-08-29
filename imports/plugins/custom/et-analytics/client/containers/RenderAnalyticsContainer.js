import { compose, withProps } from "recompose";
import { registerComponent } from "/imports/plugins/core/components/lib";
import { Reaction } from "/client/api";
import { Meteor } from "meteor/meteor";
import { Products } from "../../../../../../lib/collections";

import Analytics from "../components";

registerComponent("Analytics", Analytics);

export default Analytics;
