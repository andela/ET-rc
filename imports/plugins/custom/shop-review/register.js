import { Reaction } from "/server/api";
Reaction.registerPackage({
  label: "Reviews",
  name: "Shop-Reviews",
  registry: [
    {
      route: "/myshop",
      name: "myshop",
      template: "myShop",
      workflow: "coreWorkflow"
    }
  ]
});
