// Test script to verify connectivity
const { web3, RolesContract, SupplyChainContract } = require("./utils/web3");

const testWeb3Connectivity = async () => {
  try {
    // Fetch connected accounts
    const accounts = await web3.eth.getAccounts();
    console.log("Connected accounts:", accounts);

    // Fetch admin address from Roles contract
    const admin = await RolesContract.methods.admin().call();
    console.log("Admin address from Roles contract:", admin);

    // Fetch owner address from SupplyChain contract
    const owner = await SupplyChainContract.methods.Owner().call();
    console.log("Owner address from SupplyChain contract:", owner);
  } catch (err) {
    console.error("Error connecting to blockchain:", err.message);
  }
};

// Run the test
testWeb3Connectivity();

module.exports = testWeb3Connectivity;