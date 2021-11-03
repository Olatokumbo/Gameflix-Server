const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("../config/database");

const ReviewSchema = new mongoose.Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  location: { type: Object, required: true },
  date: { type: Date, required: true },
});

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  posterURL: { type: String, required: true },
  coverURL: { type: String, required: true },
  reviews: { type: [ReviewSchema], required: true },
});

const Game = mongoose.model("Game", GameSchema);
module.exports = Game;
