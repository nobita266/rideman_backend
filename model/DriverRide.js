const mongoose = require("mongoose");
const rideSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
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

    vacancy: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", rideSchema);
