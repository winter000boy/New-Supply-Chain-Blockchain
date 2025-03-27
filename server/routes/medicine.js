const express = require("express");
const router = express.Router();
const {
  addMedicine,
  updateManufacturingDetails,
  getMedicineDetails,
  markAsSold,
} = require("../controllers/medicineController");
const { authenticate, authorize } = require("../middleware/authMiddleware"); // Middleware for authentication and authorization

// Route to add a new medicine (accessible by suppliers only)
router.post("/add", authenticate, authorize("supplier"), addMedicine);

// Route to update manufacturing details for a medicine (accessible by manufacturers only)
router.post("/update-manufacturing", authenticate, authorize("manufacturer"), updateManufacturingDetails);

// Route to fetch details of a specific medicine (accessible by all authenticated users)
router.get("/:medicineId", authenticate, getMedicineDetails);

// Route to mark a medicine as sold (accessible by retailers only)
router.post("/mark-as-sold", authenticate, authorize("retailer"), markAsSold);

module.exports = router;