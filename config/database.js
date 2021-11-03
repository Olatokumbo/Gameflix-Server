require("dotenv").config();
const mongoose = require("mongoose");
const uri = `mongodb+srv://gameflixadmin:${process.env.PASSWORD}@cluster0.pphwp.mongodb.net/gameflixDB?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("Connected to DB");
});

module.exports = db;
