import React from "react";
import RoleManagement from "../components/RoleManagement";

const RolesPage = () => {
  return (
    <div>
      <h1>Role Management</h1>
      <p>
        Assign, revoke, and view roles for users in the supply chain. Use the
        form below to manage roles for Ethereum addresses.
      </p>
      <RoleManagement />
    </div>
  );
};

export default RolesPage;