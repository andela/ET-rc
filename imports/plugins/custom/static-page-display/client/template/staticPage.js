import { StaticPages } from "/lib/collections";
import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import { Router } from "/client/api";
import marked from "marked";
import "../stylesheet/style.css";

Template.staticPages.helpers({
  staticPage() {
    const current = Router.current();
    const pageURLAddress = current.params.pageURLAddress;
    const subscription = Meteor.subscribe("StaticPages");
    if (subscription.ready()) {
      const page = StaticPages.find({ pageURLAddress }).fetch();
      const { pageContent, pageTitle } = page[0];
      const markedContent = marked(pageContent);
      return { title: pageTitle, content: markedContent };
    }
  }
});

