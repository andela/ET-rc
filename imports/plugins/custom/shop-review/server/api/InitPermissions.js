import { Shops } from "/lib/collections";
import { Reaction, Hooks } from "/server/api";

const addRolesToVisitors = () => {
  // Add the about permission to all default roles since it's available to all
  const shop = Shops.findOne(Reaction.getShopId());
  Shops.update(shop._id, {
    $addToSet: { defaultVisitorRole: "et-shop-review" }
  }
  );
  Shops.update(shop._id, {
    $addToSet: { defaultRoles: "et-shop-review" }
  });
};

Hooks.Events.add("afterCoreInit", () => {
  console.log('hello')
  addRolesToVisitors();
});
