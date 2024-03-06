const mongoose = require("mongoose");

const driverProfileSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    ratings: {
      type: String,
    },
    drivingSkills: {
      type: String,
    },
    isProfileVerified: {
      type: Boolean,
    },
    bio: {
      type: String,
    },
    ridesCompleted: {
      type: Number,
    },
    rides: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ride" }],
    veichleDetails: {
      veichleName: {
        type: String,
      },
      veichleModel: {
        type: String,
      },
      veichleYear: {
        type: Number,
      },
      color: {
        type: String,
      },
      numberPlate: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverProfileSchema);
