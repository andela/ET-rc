import { Mongo } from "meteor/mongo";
import { Wallets as WalletSchema } from "./wallet";
import { WalletTransaction as WalletTransactionSchema } from "./walletTransaction";
const Wallets = new Mongo.Collection("Wallets");
const WalletTransaction = new Mongo.Collection("WalletTransaction");
Wallets.attachSchema(WalletSchema);
WalletTransaction.attachSchema(WalletTransactionSchema);
export { Wallets, WalletTransaction };
