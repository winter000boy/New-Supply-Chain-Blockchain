require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const supplyChainRoutes = require('./routes/supplyChainRoutes'); // Import supply chain routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/supply-chain', supplyChainRoutes); // Supply chain routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});