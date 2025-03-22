const pool = require('./db'); // Import the database connection

const testDatabaseQuery = async () => {
  try {
    const email = 'tinny00giant@gmail.com'; // Replace with the email you want to test
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log('User fetched from database:', result.rows[0]);
  } catch (err) {
    console.error('Error fetching user from database:', err.message);
  }
};

testDatabaseQuery();