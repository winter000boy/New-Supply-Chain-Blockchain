import React from "react";
import RoleManagement from "../components/RoleManagement";
import "./RolesPage.css"; // Import the CSS file for styling

const RolesPage = () => {
  return (
    <div className="roles-page-container">
      <h1 className="roles-page-title">Role Management</h1>
      <p className="roles-page-description">
        Assign, revoke, and view roles for users in the supply chain. Use the form below to manage roles for Ethereum addresses.
      </p>
      <RoleManagement />
    </div>
  );
};

export default RolesPage;