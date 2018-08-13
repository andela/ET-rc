import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import { StaticPages } from "/lib/collections";
import Footer from "../components/staticPages";

/**
 * Create the collection
 *
 * @return {Function|Object} Array of static pages
 */

const Container = createContainer(() => {
// remember to refactor the subscription and place somewhere else
  const handle = Meteor.subscribe("StaticPagesServer");
  return {
    loading: !handle.ready(),
    pages: handle ? StaticPages.find({}).fetch() : []
  };
}, Footer);
// registerComponent("Footer", Footer, [composeWithTracker(composer), withProps(handlers)]);

export default Container;

