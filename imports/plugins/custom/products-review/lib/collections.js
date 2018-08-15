import { Mongo } from "meteor/mongo";
import * as schema from "./schema";

export const Reviews = new Mongo.Collection("Reviews");
Reviews.attachSchema(schema.ReviewSchema);
