const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("../config/database");

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

AdminSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
