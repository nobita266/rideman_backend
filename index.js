const express = require("express");
require("dotenv").config();
const { DBConnection } = require("./database/db");
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

app.listen(8080, () => {
  console.log("server listen in 8080");
});
