// routes/driverRideRoutes.js
const express = require("express");
const router = express.Router();
const driverRideController = require("../controller/driverRideController");

router.post("/addride", driverRideController.addRide);
router.get("/yourRide", driverRideController.getYourRides);
router.post("/searchride", driverRideController.searchRides);
router.get("/searchride", driverRideController.individualRide);
router.delete("/driverRide/:id", driverRideController.deleteRide);
router.put("/driverRide/:id", driverRideController.updateRide);

module.exports = router;
