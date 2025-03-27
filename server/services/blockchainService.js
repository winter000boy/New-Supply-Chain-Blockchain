require('dotenv').config();
const Web3 = require('web3');

// Initialize Web3 with the blockchain URL from the .env file
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL));

// Smart contract details
const contractABI = JSON.parse(process.env.CONTRACT_ABI); // Load ABI from .env or configuration
const contractAddress = process.env.CONTRACT_ADDRESS; // Load contract address from .env

// Initialize the smart contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

/**
 * Log data on the blockchain.
 * @param {string} batchId - The batch ID to log.
 * @param {string} data - The data to log.
 * @param {string} sender - The address of the sender.
 * @returns {Promise<Object>} - The transaction receipt.
 */
const logData = async (batchId, data, sender) => {
  try {
    const receipt = await contract.methods
      .logBatchData(batchId, data, sender)
      .send({ from: sender, gas: 3000000 });

    console.log('Data logged on blockchain:', receipt);
    return receipt;
  } catch (err) {
    console.error('Error logging data on blockchain:', err.message);
    throw new Error('Failed to log data on blockchain');
  }
};

/**
 * Retrieve data from the blockchain.
 * @param {string} batchId - The batch ID to retrieve.
 * @returns {Promise<Object>} - The retrieved data.
 */
const getData = async (batchId) => {
  try {
    const data = await contract.methods.getBatchData(batchId).call();
    console.log('Data retrieved from blockchain:', data);
    return data;
  } catch (err) {
    console.error('Error retrieving data from blockchain:', err.message);
    throw new Error('Failed to retrieve data from blockchain');
  }
};

/**
 * Update data on the blockchain.
 * @param {string} batchId - The batch ID to update.
 * @param {string} updatedData - The updated data.
 * @param {string} sender - The address of the sender.
 * @returns {Promise<Object>} - The transaction receipt.
 */
const updateData = async (batchId, updatedData, sender) => {
  try {
    const receipt = await contract.methods
      .updateBatchData(batchId, updatedData, sender)
      .send({ from: sender, gas: 3000000 });

    console.log('Data updated on blockchain:', receipt);
    return receipt;
  } catch (err) {
    console.error('Error updating data on blockchain:', err.message);
    throw new Error('Failed to update data on blockchain');
  }
};

module.exports = {
  logData,
  getData,
  updateData,
};