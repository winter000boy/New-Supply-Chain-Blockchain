const Web3 = require("web3");
require("dotenv").config(); // Load environment variables

// Load contract ABI and address
const RolesABI = require("../../client/src/artifacts/Roles.json").abi; // Replace with the correct path to Roles.json
const SupplyChainABI = require("../../client/src/artifacts/SupplyChain.json").abi; // Replace with the correct path to SupplyChain.json

// Deployed contract addresses from migration output
const RolesAddress = "0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab"; // Address of the Roles contract
const SupplyChainAddress = "0xCfEB869F69431e42cdB54A4F4f105C19C080A601"; // Address of the SupplyChain contract

// Initialize Web3
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL || "http://127.0.0.1:7545"));

// Initialize contracts
const RolesContract = new web3.eth.Contract(RolesABI, RolesAddress);
const SupplyChainContract = new web3.eth.Contract(SupplyChainABI, SupplyChainAddress);

module.exports = {
  web3,
  RolesContract,
  SupplyChainContract,
};