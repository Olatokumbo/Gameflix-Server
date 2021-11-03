const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const beaderHeader = req.headers["authorization"];
  if (typeof beaderHeader !== "undefined") {
    const bearer = beaderHeader.split(" ");
    const token = bearer[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (!err) {
        req.userData = data;
        next();
      } else res.status(403).json("Invalid Token");
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyToken;
