const express = require("express");
const router = express.Router();
const {
  getProductHistory,
  getProductStatus,
  updateStorageConditions,
} = require("../controllers/trackingController");

// Route to fetch the history of a specific product
router.get("/history/:productId", getProductHistory);

// Route to fetch the current status of a specific product
router.get("/status/:productId", getProductStatus);

// Route to update the storage conditions of a product
router.post("/update-storage", updateStorageConditions);

module.exports = router;