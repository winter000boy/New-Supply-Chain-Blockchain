const express = require("express");
const router = express.Router();
const { assignRole, revokeRole, getRole, transferAdmin } = require("../controllers/rolesController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Routes
router.post("/assign", authenticate, authorize("admin"), assignRole); // Admin-only
router.post("/revoke", authenticate, authorize("admin"), revokeRole); // Admin-only
router.get("/:address", authenticate, getRole); // Accessible by all authenticated users
router.post("/transfer-admin", authenticate, authorize("admin"), transferAdmin); // Admin-only

// Health check route
router.get("/", (req, res) => {
  res.status(200).send("Roles API is working");
});

module.exports = router;