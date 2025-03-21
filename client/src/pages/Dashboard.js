import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to the Pharma Supply Chain Management System</h1>
      <p>
        This system leverages blockchain technology to ensure transparency and
        traceability in the pharmaceutical supply chain.
      </p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Navigation Cards */}
        <div style={cardStyle}>
          <h3>Role Management</h3>
          <p>Assign and manage roles for users in the supply chain.</p>
          <Link to="/roles" style={linkStyle}>
            Manage Roles
          </Link>
        </div>

        <div style={cardStyle}>
          <h3>Medicine Management</h3>
          <p>Add and manage medicines in the supply chain.</p>
          <Link to="/add-medicine" style={linkStyle}>
            Manage Medicines
          </Link>
        </div>

        <div style={cardStyle}>
          <h3>Supply Chain</h3>
          <p>Track and manage the flow of medicines in the supply chain.</p>
          <Link to="/supply-chain" style={linkStyle}>
            View Supply Chain
          </Link>
        </div>

        <div style={cardStyle}>
          <h3>Product Tracking</h3>
          <p>Track the history and status of specific products.</p>
          <Link to="/track-product" style={linkStyle}>
            Track Products
          </Link>
        </div>
      </div>
    </div>
  );
};

// Inline styles for simplicity
const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "20px",
  width: "200px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const linkStyle = {
  display: "inline-block",
  marginTop: "10px",
  padding: "10px 15px",
  backgroundColor: "#007bff",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "4px",
};

export default Dashboard;