require('dotenv').config();
const Web3 = require('web3');

// Initialize Web3 with the blockchain URL from the .env file
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL));

// Smart contract details
const contractABI = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "oldAdmin",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "AdminTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "batchId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "data",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "role",
        "type": "string"
      }
    ],
    "name": "logBatchData",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "batchId",
        "type": "string"
      }
    ],
    "name": "getBatchData",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "batchId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "updatedData",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "role",
        "type": "string"
      }
    ],
    "name": "updateBatchData",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const contractAddress = '0xa6CCc594d9081847A1226C8aba0f503bf123D304'; // Replace with your deployed contract address

// Initialize the smart contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to log data on the blockchain
const logData = async (batchId, data, role) => {
  try {
    const accounts = await web3.eth.getAccounts(); // Get available accounts
    const sender = accounts[0]; // Use the first account as the sender

    // Call the smart contract function to log data
    const receipt = await contract.methods
      .logBatchData(batchId, data, role)
      .send({ from: sender, gas: 3000000 });

    console.log('Data logged on blockchain:', receipt);
    return receipt;
  } catch (err) {
    console.error('Error logging data on blockchain:', err);
    throw new Error('Failed to log data on blockchain');
  }
};

// Function to retrieve data from the blockchain
const getData = async (batchId) => {
  try {
    // Call the smart contract function to retrieve data
    const data = await contract.methods.getBatchData(batchId).call();
    console.log('Data retrieved from blockchain:', data);
    return data;
  } catch (err) {
    console.error('Error retrieving data from blockchain:', err);
    throw new Error('Failed to retrieve data from blockchain');
  }
};

// Function to update data on the blockchain
const updateData = async (batchId, updatedData, role) => {
  try {
    const accounts = await web3.eth.getAccounts(); // Get available accounts
    const sender = accounts[0]; // Use the first account as the sender

    // Call the smart contract function to update data
    const receipt = await contract.methods
      .updateBatchData(batchId, updatedData, role)
      .send({ from: sender, gas: 3000000 });

    console.log('Data updated on blockchain:', receipt);
    return receipt;
  } catch (err) {
    console.error('Error updating data on blockchain:', err);
    throw new Error('Failed to update data on blockchain');
  }
};

module.exports = {
  logData,
  getData,
  updateData,
};