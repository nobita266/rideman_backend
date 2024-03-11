const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  rides: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ride" }],
});

module.exports = mongoose.model("User", userSchema);
