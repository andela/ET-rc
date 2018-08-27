import { Mongo } from "meteor/mongo";
import * as Schemas from "./schemas";
const Reviews = new Mongo.Collection("Reviews");
Reviews.attachSchema(Schemas.Reviews);
export { Reviews };
