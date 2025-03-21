import React, { useState } from "react";
import { assignRole, revokeRole, getRole } from "../services/rolesService";

const RoleManagement = () => {
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [roleInfo, setRoleInfo] = useState(null);
  const [message, setMessage] = useState("");

  const handleAssignRole = async () => {
    try {
      const response = await assignRole({ address, role: parseInt(role) });
      setMessage(`Role assigned successfully: ${response.data.message}`);
    } catch (err) {
      setMessage(`Error assigning role: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleRevokeRole = async () => {
    try {
      const response = await revokeRole({ address });
      setMessage(`Role revoked successfully: ${response.data.message}`);
    } catch (err) {
      setMessage(`Error revoking role: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleGetRole = async () => {
    try {
      const response = await getRole(address);
      setRoleInfo(response.data.role);
      setMessage("");
    } catch (err) {
      setMessage(`Error fetching role: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div>
      <h2>Role Management</h2>
      <div>
        <label>Ethereum Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Ethereum address"
        />
      </div>
      <div>
        <label>Role (1: Supplier, 2: Manufacturer, 3: Distributor, 4: Retailer):</label>
        <input
          type="number"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter role ID"
        />
      </div>
      <button onClick={handleAssignRole}>Assign Role</button>
      <button onClick={handleRevokeRole}>Revoke Role</button>
      <button onClick={handleGetRole}>Get Role</button>
      {roleInfo && <p>Role Info: {roleInfo}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default RoleManagement;