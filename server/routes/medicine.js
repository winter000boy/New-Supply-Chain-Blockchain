const express = require("express");
const router = express.Router();
const {
  addMedicine,
  updateManufacturingDetails,
  getMedicineDetails,
  markAsSold,
} = require("../controllers/medicineController");

// Route to add a new medicine
router.post("/add", addMedicine);

// Route to update manufacturing details for a medicine
router.post("/update-manufacturing", updateManufacturingDetails);

// Route to fetch details of a specific medicine
router.get("/:medicineId", getMedicineDetails);

// Route to mark a medicine as sold
router.post("/mark-as-sold", markAsSold);

module.exports = router;