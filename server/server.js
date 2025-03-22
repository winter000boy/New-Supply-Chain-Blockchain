require('dotenv').config();
// filepath: c:\Users\Sharma\Desktop\New folder\Coffee Supply Chain\New Supply Chain Blockchain\server\server.js
const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});