const Web3 = require("web3");
require("dotenv").config(); // Load environment variables

// Load contract ABI and addresses from environment variables or configuration
const RolesABI = require("../../client/src/artifacts/Roles.json").abi; // Replace with the correct path to Roles.json
const SupplyChainABI = require("../../client/src/artifacts/SupplyChain.json").abi; // Replace with the correct path to SupplyChain.json
const RolesAddress = process.env.ROLES_CONTRACT_ADDRESS || "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab"; // Default address for Roles contract
const SupplyChainAddress = process.env.SUPPLY_CHAIN_CONTRACT_ADDRESS || "0xCfEB869F69431e42cdB54A4F4f105C19C080A601"; // Default address for SupplyChain contract

// Initialize Web3
let web3;
try {
  web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL || "http://127.0.0.1:7545"));
  console.log("Web3 initialized successfully");
} catch (err) {
  console.error("Error initializing Web3:", err.message);
  throw new Error("Failed to initialize Web3");
}

// Initialize contracts
let RolesContract, SupplyChainContract;
try {
  RolesContract = new web3.eth.Contract(RolesABI, RolesAddress);
  SupplyChainContract = new web3.eth.Contract(SupplyChainABI, SupplyChainAddress);
  console.log("Contracts initialized successfully");
} catch (err) {
  console.error("Error initializing contracts:", err.message);
  throw new Error("Failed to initialize contracts");
}

module.exports = {
  web3,
  RolesContract,
  SupplyChainContract,
};