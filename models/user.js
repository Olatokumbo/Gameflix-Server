const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("../config/database");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

UserSchema.pre("save", function (next) {
  //console.log("saving...");
  var user = this;
  // Verifies whether the email exists already
  User.find({ email: user.email }, function (err, docs) {
    if (!docs.length) {
      // only hash the password if it has been modified (or is new)
      if (!user.isModified("password")) return next();

      // generate a salt
      bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
        });
      });
    } else {
      //console.log("user exists: ", user.email);
      next(new Error("User Already exists!"));
    }
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
