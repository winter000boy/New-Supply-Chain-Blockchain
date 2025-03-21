// Test script to verify connectivity
const { web3, RolesContract, SupplyChainContract } = require("./web3");

(async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("Connected accounts:", accounts);

    const admin = await RolesContract.methods.admin().call();
    console.log("Admin address from Roles contract:", admin);

    const owner = await SupplyChainContract.methods.Owner().call();
    console.log("Owner address from SupplyChain contract:", owner);
  } catch (err) {
    console.error("Error connecting to blockchain:", err.message);
  }
})();