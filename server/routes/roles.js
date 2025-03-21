const express = require("express");
const router = express.Router();
const { assignRole, revokeRole, getRole, transferAdmin } = require("../controllers/rolesController");

router.post("/assign", assignRole);
router.post("/revoke", revokeRole);
router.get("/:address", getRole);
router.post("/transfer-admin", transferAdmin);
router.get("/", (req, res) => {
    res.status(200).send("Roles API is working");
  });

module.exports = router;