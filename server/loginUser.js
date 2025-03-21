const bcrypt = require('bcrypt');
const pool = require('./db'); // Import the database connection

const loginUser = async (email, password) => {
  try {
    // Fetch the user from the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return console.log('User not found');
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.log('Login successful:', user);
      // Generate a JWT token or start a session here
    } else {
      console.log('Invalid credentials');
    }
  } catch (err) {
    console.error('Error logging in:', err);
  }
};

// Example login
loginUser('admin@example.com', 'admin123');