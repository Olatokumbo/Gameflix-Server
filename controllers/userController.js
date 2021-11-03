const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { sessionizeUser } = require("../utils/helper");

//////GET GAME INFO
const getUserInfo = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      return res
        .status(200)
        .json({ id: user._id, username: user.username, email: user.email });
    })
    .catch((err) => {
      return res.status(404).json({ message: err.message });
    });
};

const getUserInfoByToken = (req, res) => {
  return res.status(200).json(req.userData);
};

module.exports = {
  getUserInfo,
  getUserInfoByToken,
};
