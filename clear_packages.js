/* eslint prefer-destructuring: 0, no-console:0, vars-on-top: 0, no-var: 0 */
var MongoClient = require("mongodb").MongoClient;

if (process.env.HEROKU_APP_NAME) {
  var url = process.env.MONGODB_URI || "";


  var insertDocuments = (db, callback) => {
  // Get the documents collection
    var collection = db.collection("Packages");
    // Insert some documents
    collection.remove((err, result) => {
      console.log("Packages cleared ... Restarting Dynos");
      callback(result);
    });
  };

  MongoClient.connect(url, (err, db) => {
    console.log("Connected successfully to server");
    insertDocuments(db, () => {
      db.close();
    });
  });
}
