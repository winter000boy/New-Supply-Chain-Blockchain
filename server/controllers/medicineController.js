const { SupplyChainContract, web3 } = require("../utils/web3");

/**
 * Add a new medicine to the supply chain.
 * @param {Object} req - The request object containing medicine details.
 * @param {Object} res - The response object.
 */
const addMedicine = async (req, res) => {
  try {
    const { name, description, batchNumber, expirationDate, RMSid } = req.body;

    // Validate input
    if (!name || !description || !batchNumber || !expirationDate || !RMSid) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Get the supplier account to send the transaction
    const accounts = await web3.eth.getAccounts();
    const supplierAccount = accounts[0]; // Replace with dynamic account if needed

    // Call the smart contract method to add the medicine
    await SupplyChainContract.methods
      .addMedicine(name, description, batchNumber, expirationDate, RMSid)
      .send({ from: supplierAccount });

    res.status(200).json({ message: "Medicine added successfully" });
  } catch (err) {
    console.error("Error adding medicine:", err.message);
    res.status(500).json({ error: "Failed to add medicine", details: err.message });
  }
};

/**
 * Update manufacturing details for a medicine.
 * @param {Object} req - The request object containing medicine ID and manufacturing details.
 * @param {Object} res - The response object.
 */
const updateManufacturingDetails = async (req, res) => {
  try {
    const { medicineId, manufacturerId } = req.body;

    // Validate input
    if (!medicineId || !manufacturerId) {
      return res.status(400).json({ error: "Medicine ID and Manufacturer ID are required" });
    }

    // Get the manufacturer account to send the transaction
    const accounts = await web3.eth.getAccounts();
    const manufacturerAccount = accounts[0]; // Replace with dynamic account if needed

    // Call the smart contract method to update manufacturing details
    await SupplyChainContract.methods
      .updateManufacturingDetails(medicineId, manufacturerId)
      .send({ from: manufacturerAccount });

    res.status(200).json({ message: "Manufacturing details updated successfully" });
  } catch (err) {
    console.error("Error updating manufacturing details:", err.message);
    res.status(500).json({ error: "Failed to update manufacturing details", details: err.message });
  }
};

/**
 * Fetch details of a specific medicine.
 * @param {Object} req - The request object containing the medicine ID.
 * @param {Object} res - The response object.
 */
const getMedicineDetails = async (req, res) => {
  try {
    const { medicineId } = req.params;

    // Validate input
    if (!medicineId) {
      return res.status(400).json({ error: "Medicine ID is required" });
    }

    // Call the smart contract method to fetch medicine details
    const medicine = await SupplyChainContract.methods.MedicineStock(medicineId).call();

    res.status(200).json({ medicine });
  } catch (err) {
    console.error("Error fetching medicine details:", err.message);
    res.status(500).json({ error: "Failed to fetch medicine details", details: err.message });
  }
};

/**
 * Mark a medicine as sold.
 * @param {Object} req - The request object containing the medicine ID.
 * @param {Object} res - The response object.
 */
const markAsSold = async (req, res) => {
  try {
    const { medicineId } = req.body;

    // Validate input
    if (!medicineId) {
      return res.status(400).json({ error: "Medicine ID is required" });
    }

    // Get the retailer account to send the transaction
    const accounts = await web3.eth.getAccounts();
    const retailerAccount = accounts[0]; // Replace with dynamic account if needed

    // Call the smart contract method to mark the medicine as sold
    await SupplyChainContract.methods.markAsSold(medicineId).send({ from: retailerAccount });

    res.status(200).json({ message: "Medicine marked as sold successfully" });
  } catch (err) {
    console.error("Error marking medicine as sold:", err.message);
    res.status(500).json({ error: "Failed to mark medicine as sold", details: err.message });
  }
};

module.exports = {
  addMedicine,
  updateManufacturingDetails,
  getMedicineDetails,
  markAsSold,
};