const express = require("express");
const router = express.Router();
const {
  getProductHistory,
  getProductStatus,
  updateStorageConditions,
} = require("../controllers/trackingController");
const { authenticate, authorize } = require("../middleware/authMiddleware"); // Middleware for authentication and authorization

// Route to fetch the history of a specific product (accessible by all authenticated users)
router.get("/history/:productId", authenticate, getProductHistory);

// Route to fetch the current status of a specific product (accessible by all authenticated users)
router.get("/status/:productId", authenticate, getProductStatus);

// Route to update the storage conditions of a product (accessible by distributors only)
router.post("/update-storage", authenticate, authorize("distributor"), updateStorageConditions);

module.exports = router;