// filepath: c:\Users\Sharma\Desktop\New folder\Coffee Supply Chain\New Supply Chain Blockchain\server\routes\authRoutes.js
const express = require('express');
const { loginUser } = require('../controllers/authController');

const router = express.Router();

// Login route
router.post('/login', loginUser);

module.exports = router;