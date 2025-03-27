const { SupplyChainContract, web3 } = require("../utils/web3");

/**
 * Fetch the history of a specific product.
 * @param {Object} req - The request object containing the product ID.
 * @param {Object} res - The response object.
 */
const getProductHistory = async (req, res) => {
  try {
    const { productId } = req.params;

    // Validate input
    if (!productId) {
      return res.status(400).json({ success: false, error: "Product ID is required" });
    }

    // Call the smart contract method to fetch product history
    const history = await SupplyChainContract.methods.getProductHistory(productId).call();

    res.status(200).json({ success: true, productId, history });
  } catch (err) {
    console.error("Error fetching product history:", err.message);
    res.status(500).json({ success: false, error: "Failed to fetch product history", details: err.message });
  }
};

/**
 * Fetch the current status of a specific product.
 * @param {Object} req - The request object containing the product ID.
 * @param {Object} res - The response object.
 */
const getProductStatus = async (req, res) => {
  try {
    const { productId } = req.params;

    // Validate input
    if (!productId) {
      return res.status(400).json({ success: false, error: "Product ID is required" });
    }

    // Call the smart contract method to fetch product status
    const status = await SupplyChainContract.methods.getProductStatus(productId).call();

    res.status(200).json({ success: true, productId, status });
  } catch (err) {
    console.error("Error fetching product status:", err.message);
    res.status(500).json({ success: false, error: "Failed to fetch product status", details: err.message });
  }
};

/**
 * Update the storage conditions of a product.
 * @param {Object} req - The request object containing product ID and storage conditions.
 * @param {Object} res - The response object.
 */
const updateStorageConditions = async (req, res) => {
  try {
    const { productId, conditions } = req.body;

    // Validate input
    if (!productId || !conditions) {
      return res.status(400).json({ success: false, error: "Product ID and storage conditions are required" });
    }

    // Get the distributor account from the authenticated user
    const distributorAccount = req.user.address; // Assuming `req.user` contains the authenticated user's details

    // Call the smart contract method to update storage conditions
    await SupplyChainContract.methods
      .updateStorageConditions(productId, conditions)
      .send({ from: distributorAccount });

    res.status(200).json({ success: true, message: "Storage conditions updated successfully" });
  } catch (err) {
    console.error("Error updating storage conditions:", err.message);
    res.status(500).json({ success: false, error: "Failed to update storage conditions", details: err.message });
  }
};

module.exports = {
  getProductHistory,
  getProductStatus,
  updateStorageConditions,
};