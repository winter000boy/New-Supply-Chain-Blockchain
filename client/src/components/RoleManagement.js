import React, { useState } from "react";
import { assignRole, revokeRole, getRole } from "../services/rolesService";
import "./RoleManagement.css"; // Import the CSS file for styling

const RoleManagement = () => {
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [roleInfo, setRoleInfo] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleAssignRole = async () => {
    if (!address.trim() || !role.trim()) {
      setMessage("Please enter a valid Ethereum address and role.");
      return;
    }

    setLoading(true); // Start loading
    setMessage(""); // Clear previous messages

    try {
      const response = await assignRole({ address, role: parseInt(role) });
      setMessage(`Role assigned successfully: ${response.data.message}`);
    } catch (err) {
      setMessage(`Error assigning role: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleRevokeRole = async () => {
    if (!address.trim()) {
      setMessage("Please enter a valid Ethereum address.");
      return;
    }

    setLoading(true); // Start loading
    setMessage(""); // Clear previous messages

    try {
      const response = await revokeRole({ address });
      setMessage(`Role revoked successfully: ${response.data.message}`);
    } catch (err) {
      setMessage(`Error revoking role: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleGetRole = async () => {
    if (!address.trim()) {
      setMessage("Please enter a valid Ethereum address.");
      return;
    }

    setLoading(true); // Start loading
    setMessage(""); // Clear previous messages

    try {
      const response = await getRole(address);
      setRoleInfo(response.data.role);
      setMessage("");
    } catch (err) {
      setMessage(`Error fetching role: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="role-management-container">
      <h2 className="role-management-title">Role Management</h2>
      <div className="form-group">
        <label htmlFor="address">Ethereum Address:</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Ethereum address"
          className="form-input"
          aria-label="Ethereum Address"
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role (1: Supplier, 2: Manufacturer, 3: Distributor, 4: Retailer):</label>
        <input
          id="role"
          type="number"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter role ID"
          className="form-input"
          aria-label="Role ID"
        />
      </div>
      <div className="button-group">
        <button
          onClick={handleAssignRole}
          className="role-management-button"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Assigning..." : "Assign Role"}
        </button>
        <button
          onClick={handleRevokeRole}
          className="role-management-button"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Revoking..." : "Revoke Role"}
        </button>
        <button
          onClick={handleGetRole}
          className="role-management-button"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Fetching..." : "Get Role"}
        </button>
      </div>
      {roleInfo && (
        <div className="role-management-result">
          <h3>Role Info:</h3>
          <p>{roleInfo}</p>
        </div>
      )}
      {message && <p className="role-management-message">{message}</p>}
    </div>
  );
};

export default RoleManagement;