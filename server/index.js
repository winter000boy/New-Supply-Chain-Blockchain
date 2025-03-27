const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan"); // Logging middleware

dotenv.config(); // Load environment variables

// Validate required environment variables
if (!process.env.PORT || !process.env.JWT_SECRET || !process.env.BLOCKCHAIN_URL) {
  console.error("Error: Missing required environment variables.");
  process.exit(1); // Exit the application if required variables are missing
}

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(morgan("dev")); // Log HTTP requests

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

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});