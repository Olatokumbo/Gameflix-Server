// ⚠️⚠️⚠️ Not using this ⚠️⚠️⚠️ 

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("../config/database");

const ReviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  location: { type: Object, required: true },
  createdAt: { type: Date, required: true },
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
