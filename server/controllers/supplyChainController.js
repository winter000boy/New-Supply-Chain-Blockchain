const blockchainService = require('../services/blockchainService');
const qrService = require('../services/qrService');

// Supplier logs batch details and generates a QR code
const logBatchDetails = async (req, res) => {
  const { batchId, data, role } = req.body;

  try {
    // Log batch details on the blockchain
    const receipt = await blockchainService.logData(batchId, data, role);

    // Generate a QR code for the batch
    const qrCode = await qrService.generateQRCode(`http://localhost:5000/api/supply-chain/batch/${batchId}`);

    res.json({
      message: 'Batch details logged successfully',
      receipt,
      qrCode, // Return the QR code as a base64 string
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Manufacturer updates production details
const updateProductionDetails = async (req, res) => {
  const { batchId, updatedData, role } = req.body;

  try {
    // Update production details on the blockchain
    const receipt = await blockchainService.updateData(batchId, updatedData, role);

    res.json({
      message: 'Production details updated successfully',
      receipt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Distributor logs transport details
const logTransportDetails = async (req, res) => {
  const { batchId, updatedData, role } = req.body;

  try {
    // Log transport details on the blockchain
    const receipt = await blockchainService.updateData(batchId, updatedData, role);

    res.json({
      message: 'Transport details logged successfully',
      receipt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retailer confirms receipt and storage
const confirmReceipt = async (req, res) => {
  const { batchId, updatedData, role } = req.body;

  try {
    // Confirm receipt and update blockchain
    const receipt = await blockchainService.updateData(batchId, updatedData, role);

    res.json({
      message: 'Receipt confirmed successfully',
      receipt,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Consumer verifies product authenticity
const verifyProduct = async (req, res) => {
  const { batchId } = req.params;

  try {
    // Retrieve batch details from the blockchain
    const data = await blockchainService.getData(batchId);

    res.json({
      message: 'Product verified successfully',
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  logBatchDetails,
  updateProductionDetails,
  logTransportDetails,
  confirmReceipt,
  verifyProduct,
};