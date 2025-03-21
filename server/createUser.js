const bcrypt = require('bcrypt');
const pool = require('./db'); // Import the database connection

const createUser = async (email, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const result = await pool.query(
      'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, role]
    );
    console.log('User created:', result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err);
  }
};

// Users data
const users = [
  { email: 'tinny00giant@gmail.com', password: 'durgesh', role: 'admin' }, // Master user
  { email: 'ds6219621966@gmail.com', password: 'durgesh', role: 'supplier' },
  { email: 'vishalmungal55@gmail.com', password: 'vishal', role: 'manufacturer' },
  { email: 'amit26khairnar@gmail.com', password: 'amit', role: 'distributor' },
  { email: 'swarajgavali619@gmail.com', password: 'swaraj', role: 'retailer' },
];

// Create users
users.forEach(user => createUser(user.email, user.password, user.role));