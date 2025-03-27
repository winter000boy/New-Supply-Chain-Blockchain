const blockchainService = require('../services/blockchainService');
const qrService = require('../services/qrService');

/**
 * Supplier logs batch details and generates a QR code.
 */
const logBatchDetails = async (req, res) => {
  const { batchId, data } = req.body;

  try {
    // Get the supplier account from the authenticated user
    const supplierAccount = req.user.address;

    // Log batch details on the blockchain
    const receipt = await blockchainService.logData(batchId, data, supplierAccount);

    // Generate a QR code for the batch
    const qrCode = await qrService.generateQRCode(`http://localhost:5000/api/supply-chain/batch/${batchId}`);

    res.status(200).json({
      success: true,
      message: 'Batch details logged successfully',
      receipt,
      qrCode, // Return the QR code as a base64 string
    });
  } catch (err) {
    console.error('Error logging batch details:', err.message);
    res.status(500).json({ success: false, error: 'Failed to log batch details', details: err.message });
  }
};

/**
 * Manufacturer updates production details.
 */
const updateProductionDetails = async (req, res) => {
  const { batchId, updatedData } = req.body;

  try {
    // Get the manufacturer account from the authenticated user
    const manufacturerAccount = req.user.address;

    // Update production details on the blockchain
    const receipt = await blockchainService.updateData(batchId, updatedData, manufacturerAccount);

    res.status(200).json({
      success: true,
      message: 'Production details updated successfully',
      receipt,
    });
  } catch (err) {
    console.error('Error updating production details:', err.message);
    res.status(500).json({ success: false, error: 'Failed to update production details', details: err.message });
  }
};

/**
 * Distributor logs transport details.
 */
const logTransportDetails = async (req, res) => {
  const { batchId, updatedData } = req.body;

  try {
    // Get the distributor account from the authenticated user
    const distributorAccount = req.user.address;

    // Log transport details on the blockchain
    const receipt = await blockchainService.updateData(batchId, updatedData, distributorAccount);

    res.status(200).json({
      success: true,
      message: 'Transport details logged successfully',
      receipt,
    });
  } catch (err) {
    console.error('Error logging transport details:', err.message);
    res.status(500).json({ success: false, error: 'Failed to log transport details', details: err.message });
  }
};

/**
 * Retailer confirms receipt and storage.
 */
const confirmReceipt = async (req, res) => {
  const { batchId, updatedData } = req.body;

  try {
    // Get the retailer account from the authenticated user
    const retailerAccount = req.user.address;

    // Confirm receipt and update blockchain
    const receipt = await blockchainService.updateData(batchId, updatedData, retailerAccount);

    res.status(200).json({
      success: true,
      message: 'Receipt confirmed successfully',
      receipt,
    });
  } catch (err) {
    console.error('Error confirming receipt:', err.message);
    res.status(500).json({ success: false, error: 'Failed to confirm receipt', details: err.message });
  }
};

/**
 * Consumer verifies product authenticity.
 */
const verifyProduct = async (req, res) => {
  const { batchId } = req.params;

  try {
    // Retrieve batch details from the blockchain
    const data = await blockchainService.getData(batchId);

    res.status(200).json({
      success: true,
      message: 'Product verified successfully',
      data,
    });
  } catch (err) {
    console.error('Error verifying product:', err.message);
    res.status(500).json({ success: false, error: 'Failed to verify product', details: err.message });
  }
};

module.exports = {
  logBatchDetails,
  updateProductionDetails,
  logTransportDetails,
  confirmReceipt,
  verifyProduct,
};