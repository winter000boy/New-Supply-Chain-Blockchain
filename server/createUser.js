const bcrypt = require('bcrypt');
const pool = require('./db'); // Import the database connection

/**
 * Create a new user in the database.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} role - The user's role.
 * @returns {Promise<Object>} - The created user or an error message.
 */
const createUser = async (email, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const result = await pool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, role]
    );
    console.log('User created:', result.rows[0]);
    return { success: true, user: result.rows[0] };
  } catch (err) {
    console.error('Error creating user:', err.message);
    return { success: false, message: 'Error creating user', details: err.message };
  }
};

// Example usage
(async () => {
  const users = [
    { email: 'tinny00giant@gmail.com', password: 'durgesh', role: 'admin' }, // Master user
    { email: 'ds6219621966@gmail.com', password: 'durgesh', role: 'supplier' },
    { email: 'vishalmungal55@gmail.com', password: 'vishal', role: 'manufacturer' },
    { email: 'amit26khairnar@gmail.com', password: 'amit', role: 'distributor' },
    { email: 'swarajgavali619@gmail.com', password: 'swaraj', role: 'retailer' },
  ];

  for (const user of users) {
    const result = await createUser(user.email, user.password, user.role);
    console.log(result);
  }
})();

module.exports = createUser;