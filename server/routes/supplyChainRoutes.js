const express = require('express');
const {
  logBatchDetails,
  updateProductionDetails,
  logTransportDetails,
  confirmReceipt,
  verifyProduct,
} = require('../controllers/supplyChainController');
const { authenticate, authorize } = require('../middleware/authMiddleware'); // Middleware for authentication and authorization

const router = express.Router();

// Supplier logs batch details
router.post('/supplier/log', authenticate, authorize('supplier'), logBatchDetails);

// Manufacturer updates production details
router.put('/manufacturer/update', authenticate, authorize('manufacturer'), updateProductionDetails);

// Distributor logs transport details
router.put('/distributor/log', authenticate, authorize('distributor'), logTransportDetails);

// Retailer confirms receipt
router.put('/retailer/confirm', authenticate, authorize('retailer'), confirmReceipt);

// Consumer verifies product authenticity
router.get('/batch/:batchId', authenticate, verifyProduct);

module.exports = router;