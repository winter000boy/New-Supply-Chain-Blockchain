const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // PostgreSQL connection pool

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    console.log('Login request received:', req.body); // Debug log

    // Check if the user exists
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    console.log('User fetched from database:', user); // Debug log

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Debug log

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('JWT token generated:', token); // Debug log

    // Send the token and role in the response
    res.json({ token, role: user.role });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  loginUser,
};