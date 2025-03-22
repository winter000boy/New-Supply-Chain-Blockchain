const express = require('express');
const {
  logBatchDetails,
  updateProductionDetails,
  logTransportDetails,
  confirmReceipt,
  verifyProduct,
} = require('../controllers/supplyChainController');

const router = express.Router();

// Supplier logs batch details
router.post('/supplier/log', logBatchDetails);

// Manufacturer updates production details
router.put('/manufacturer/update', updateProductionDetails);

// Distributor logs transport details
router.put('/distributor/log', logTransportDetails);

// Retailer confirms receipt
router.put('/retailer/confirm', confirmReceipt);

// Consumer verifies product authenticity
router.get('/batch/:batchId', verifyProduct);

module.exports = router;