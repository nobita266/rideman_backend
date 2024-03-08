// controllers/driverRideController.js
const DriverRide = require("../model/Ride");
const User = require("../model/User");

exports.addRide = async (req, res) => {
  const {
    source,
    pickupAddress,
    destination,
    destinationAddress,
    departure,
    arrival,
    price,
    date,
    vacancy,
  } = req.body;

  try {
    // Get user's email from session
    const email = req.session.email;
    console.log(req.session);

    // Find the user by email
    const userDetails = await User.findOne({ email });
    console.log(userDetails, email);

    if (!userDetails) {
      return res.status(404).json({ error: "User not found" });
    }
    const userId = userDetails._id;
    const fullName = `${userDetails.firstname} ${userDetails.lastname}`;
    console.log(fullName);

    // Create a new ride associated with the user
    const ride = new DriverRide({
      fullName: fullName,
      source,
      pickupAddress,
      destination,
      destinationAddress,
      departure,
      arrival,
      date,
      price,
      vacancy,
      userId: userId,
    });
    await ride.save();

    // Add the ride to the user's rides
    userDetails.rides.push(ride);
    await userDetails.save();

    return res
      .status(200)
      .json({ msg: "Your ride has been added successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getYourRides = async (req, res) => {
  try {
    const email = req.session.email;
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      console.log("404 is login signup");
      return res.status(404).json({ error: "Login/signup requires not found" });
    }

    // Populate the rides associated with the user
    const ridesId = userDetails.rides;
    let rides = [];
    for (let i = 0; i < ridesId.length; i++) {
      const ride = await DriverRide.findOne(ridesId[i]);
      rides.push(ride);
    }

    return res.status(200).json({ publishRides: rides });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.searchRides = async (req, res) => {
  const { source, destination, date, vacancy } = req.body;

  try {
    // Search for rides based on source, destination, and date
    // console.log(req.session.email);
    const email = req.session.email;
    console.log(email, "yhj");
    const userDetails = await User.findOne({ email: email });
    console.log(userDetails);

    const travel_list = await DriverRide.find({
      source,
      destination,
      date,
      vacancy: { $gte: vacancy },

      // Search for rides on or after the specified date
    });

    return res.status(200).json({ travel_list });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteRide = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the driver ride by ID and delete it
    const deletedRide = await DriverRide.findByIdAndDelete(id);
    if (!deletedRide) {
      return res.status(404).json({ error: "Driver ride not found" });
    }
    // Remove the reference to the deleted ride from associated users
    await User.updateMany({ rides: id }, { $pull: { rides: id } });

    return res
      .status(200)
      .json({ message: "Driver ride deleted successfully" });
  } catch (error) {
    console.error("Error deleting driver ride:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateRide = async (req, res) => {
  const { id } = req.params;
  const { source, destination, departure, arrival, price, date, vacancy } =
    req.body;

  try {
    // Find the driver ride by ID and update its fields
    const updatedRide = await DriverRide.findByIdAndUpdate(
      id,
      {
        source,
        destination,
        departure,
        arrival,
        price,
        date,
        vacancy,
      },
      { new: true }
    );

    if (!updatedRide) {
      return res.status(404).json({ error: "Driver ride not found" });
    }

    return res.status(200).json({ updatedRide });
  } catch (error) {
    console.error("Error updating driver ride:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.individualRide = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const individualRide = await DriverRide.findById(id);
    res.status(200).json(individualRide);
  } catch (error) {
    return res.status(500).json({ msg: err.message });
  }
};
