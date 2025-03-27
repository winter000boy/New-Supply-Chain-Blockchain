require('dotenv').config(); // Load environment variables from .env
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER, // PostgreSQL username from .env
  host: process.env.DB_HOST, // Database host from .env
  database: process.env.DB_NAME, // Database name from .env
  password: process.env.DB_PASSWORD, // PostgreSQL password from .env
  port: process.env.DB_PORT, // PostgreSQL port from .env
});

module.exports = pool;