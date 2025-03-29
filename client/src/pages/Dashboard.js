import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css"; // Import the CSS file for styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to the Pharma Supply Chain Management System</h1>
      <p className="dashboard-description">
        This system leverages blockchain technology to ensure transparency and traceability in the pharmaceutical supply chain.
      </p>

      <div className="dashboard-cards">
        {/* Navigation Cards */}
        <div className="dashboard-card">
          <h3>Role Management</h3>
          <p>Assign and manage roles for users in the supply chain.</p>
          <Link to="/roles" className="dashboard-link">
            Manage Roles
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Medicine Management</h3>
          <p>Add and manage medicines in the supply chain.</p>
          <Link to="/add-medicine" className="dashboard-link">
            Manage Medicines
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Supply Chain</h3>
          <p>Track and manage the flow of medicines in the supply chain.</p>
          <Link to="/supply-chain" className="dashboard-link">
            View Supply Chain
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Product Tracking</h3>
          <p>Track the history and status of specific products.</p>
          <Link to="/track-product" className="dashboard-link">
            Track Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;