const mongoose = require("mongoose");
const rideSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    source: {
      type: String,
      required: true,
    },
    pickupAddress: {
      type: String,
    },
    destination: {
      type: String,
      required: true,
    },
    destinationAddress: {
      type: String,
    },
    departure: {
      type: String,
      required: true,
    },
    arrival: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },

    vacancy: {
      type: Number,
      required: true,
    },
    ratings: {
      driver: { type: String },
      user: { type: String },
    },
    feedback: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", rideSchema);
