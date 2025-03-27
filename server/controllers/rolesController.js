const { RolesContract, web3 } = require("../utils/web3");

/**
 * Assign a role to a user.
 */
const assignRole = async (req, res) => {
  try {
    const { address, role } = req.body;

    // Validate input
    if (!web3.utils.isAddress(address)) {
      return res.status(400).json({ error: "Invalid Ethereum address" });
    }
    if (!role || typeof role !== "number") {
      return res.status(400).json({ error: "Invalid role. Role must be a number." });
    }

    // Get the admin account from the authenticated user
    const adminAccount = req.user.address; // Assuming `req.user` contains the authenticated user's details

    // Call the smart contract method to assign the role
    await RolesContract.methods.assignRole(address, role).send({ from: adminAccount });

    res.status(200).json({ message: `Role ${role} assigned to address ${address}` });
  } catch (err) {
    console.error("Error assigning role:", err.message);
    res.status(500).json({ error: "Failed to assign role", details: err.message });
  }
};

/**
 * Revoke a role from a user.
 */
const revokeRole = async (req, res) => {
  try {
    const { address } = req.body;

    // Validate input
    if (!web3.utils.isAddress(address)) {
      return res.status(400).json({ error: "Invalid Ethereum address" });
    }

    // Get the admin account from the authenticated user
    const adminAccount = req.user.address;

    // Call the smart contract method to revoke the role
    await RolesContract.methods.revokeRole(address).send({ from: adminAccount });

    res.status(200).json({ message: `Role revoked from address ${address}` });
  } catch (err) {
    console.error("Error revoking role:", err.message);
    res.status(500).json({ error: "Failed to revoke role", details: err.message });
  }
};

/**
 * Fetch the role of a specific user.
 */
const getRole = async (req, res) => {
  try {
    const { address } = req.params;

    // Validate input
    if (!web3.utils.isAddress(address)) {
      return res.status(400).json({ error: "Invalid Ethereum address" });
    }

    // Call the smart contract method to get the role
    const role = await RolesContract.methods.getRole(address).call();

    res.status(200).json({ address, role });
  } catch (err) {
    console.error("Error fetching role:", err.message);
    res.status(500).json({ error: "Failed to fetch role", details: err.message });
  }
};

/**
 * Transfer admin privileges to another address.
 */
const transferAdmin = async (req, res) => {
  try {
    const { newAdmin } = req.body;

    // Validate input
    if (!web3.utils.isAddress(newAdmin)) {
      return res.status(400).json({ error: "Invalid Ethereum address" });
    }

    // Get the current admin account from the authenticated user
    const adminAccount = req.user.address;

    // Call the smart contract method to transfer admin privileges
    await RolesContract.methods.transferAdmin(newAdmin).send({ from: adminAccount });

    res.status(200).json({ message: `Admin privileges transferred to ${newAdmin}` });
  } catch (err) {
    console.error("Error transferring admin privileges:", err.message);
    res.status(500).json({ error: "Failed to transfer admin privileges", details: err.message });
  }
};

module.exports = {
  assignRole,
  revokeRole,
  getRole,
  transferAdmin,
};