const express = require("express");
require("dotenv").config();
const { DBConnection } = require("./database/db");
var jwt = require("jsonwebtoken");
const cors = require("cors");
const { authRoutes } = require("./routes/auth");
const { default: mongoose } = require("mongoose");
const DriverRide = require("./model/Ride");
const User = require("./model/User");
const session = require("express-session");
const driverRideRoutes = require("./routes/driverRideRoutes");
const app = express();
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

//middlewares
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routes = express.Router();
app.use(routes);
DBConnection();
//logic
app.use("/api/auth", authRoutes);

app.use("/api", driverRideRoutes);
app.post("/registerDriver", async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    age,
    isProfileVerified,
    bio,
    ridesCompleted,
  } = req.body;
});
app.post("/login/auth-social", async (req, res) => {
  try {
    const { email } = req.body;
    const id = "u" + Date.now();

    // save the user data into db
    const userData = await User.create({
      id: id,
      firstname: "chetan",
      lastname: "verma",
      email: email,
      phone: "9729446491",
    });

    //generate a token  fr user and sent it(JWT token)
    const token = jwt.sign({ id: User._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    userData.token = token;
    userData.password = undefined;
    req.session.email = email;
    res.status(200).json({
      message: "You have successfully registered!",
      token: userData.token,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

app.listen(8080, () => {
  console.log("server listen in 8080");
});
