const bcrypt = require('bcrypt');
const pool = require('./db'); // Import the database connection
const { generateToken } = require('./utils/auth'); // Import the token generation utility

/**
 * Authenticate a user and generate a JWT token.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The authentication result with a token or an error message.
 */
const loginUser = async (email, password) => {
  try {
    // Fetch the user from the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Generate a JWT token
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    return { success: true, message: 'Login successful', token, role: user.role };
  } catch (err) {
    console.error('Error logging in:', err.message);
    return { success: false, message: 'Error logging in', details: err.message };
  }
};

// Example usage
(async () => {
  const result = await loginUser('admin@example.com', 'admin123');
  console.log(result);
})();

module.exports = loginUser;