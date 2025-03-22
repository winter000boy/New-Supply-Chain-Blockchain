const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Import the database connection

// filepath: c:\Users\Sharma\Desktop\New folder\Coffee Supply Chain\New Supply Chain Blockchain\server\controllers\authController.js
const loginUser = async (req, res) => {
  console.log('Login endpoint hit'); // Debug log
  console.log('Request body:', req.body); // Log the request body

  const { email, password } = req.body;

  try {
    // Your login logic here
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { loginUser };