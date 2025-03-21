const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Import routes
const rolesRoutes = require("./routes/roles");
const medicineRoutes = require("./routes/medicine");
const trackingRoutes = require("./routes/tracking");

// API routes
app.use("/api/roles", rolesRoutes); // Routes for role management
app.use("/api/medicine", medicineRoutes); // Routes for medicine-related operations
app.use("/api/tracking", trackingRoutes); // Routes for tracking-related operations

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).send("Backend server for Coffee Supply Chain is running!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});