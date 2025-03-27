const pool = require('./db'); // Import the database connection

/**
 * Fetch a user from the database by email.
 * @param {string} email - The email of the user to fetch.
 * @returns {Promise<void>}
 */
const testDatabaseQuery = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      console.log(`No user found with email: ${email}`);
    } else {
      console.log('User fetched from database:', result.rows[0]);
    }
  } catch (err) {
    console.error('Error fetching user from database:', err.message);
  }
};

// Example usage
const email = process.argv[2] || 'tinny00giant@gmail.com'; // Pass email as a command-line argument or use default
testDatabaseQuery(email);

module.exports = testDatabaseQuery;