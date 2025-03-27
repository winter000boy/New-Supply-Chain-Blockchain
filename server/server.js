require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const supplyChainRoutes = require('./routes/supplyChainRoutes'); // Import supply chain routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Health Check Route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/supply-chain', supplyChainRoutes); // Supply chain routes

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});