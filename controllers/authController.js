const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { sessionizeUser } = require("../utils/helper");
require("dotenv").config();

//
const signup = (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password,
    createdAt: new Date(),
  });
  newUser
    .save()
    .then((user) => {
      jwt.sign(
        sessionizeUser(req.body),
        process.env.SECRET_KEY,
        (err, token) => {
          if (!err)
            res.status(201).json({ ...sessionizeUser(user._doc), token });
          else res.status(502).json({ message: "There has been an error" });
        }
      );
    })
    // .then(() => {
    //   res.status(200).json({
    //     message: "User Account has been Created",
    //   });
    // })
    .catch((err) => {
      console.log(err.message);
      res.status(400).send({ message: err.message });
    });
};
//
const signin = (req, res) => {
  const { username, password } = req.body;
  //console.log(req.body);
  User.findOne({ username }, (err, user) => {
    if (user) {
      user.comparePassword(password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          jwt.sign(
            sessionizeUser(user._doc),
            process.env.SECRET_KEY,
            //{ expiresIn: "1h" },
            (err, token) => {
              if (!err)
                res.status(201).json({ ...sessionizeUser(user._doc), token });
              else res.status(502).json({ message: "There has been an error" });
            }
          );
        } else res.status(401).send({ message: "Invalid Login Credentials" });
      });
    } else res.status(401).send({ message: "User Account does not Exist" });
  });
};

module.exports = {
  signup,
  signin,
};
