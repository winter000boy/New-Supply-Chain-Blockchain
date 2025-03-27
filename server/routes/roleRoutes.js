const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();


// Admin-only route
router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Welcome, Admin!' });
});

// Supplier-only route
router.get('/supplier', authenticate, authorize(['supplier']), (req, res) => {
  res.json({ message: 'Welcome, Supplier!' });
});

// Manufacturer-only route
router.get('/manufacturer', authenticate, authorize(['manufacturer']), (req, res) => {
  res.json({ message: 'Welcome, Manufacturer!' });
});

// Distributor-only route
router.get('/distributor', authenticate, authorize(['distributor']), (req, res) => {
  res.json({ message: 'Welcome, Distributor!' });
});

// Retailer-only route
router.get('/retailer', authenticate, authorize(['retailer']), (req, res) => {
  res.json({ message: 'Welcome, Retailer!' });
});

module.exports = router;