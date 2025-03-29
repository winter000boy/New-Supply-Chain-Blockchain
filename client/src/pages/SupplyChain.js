import React from "react";
import { Link } from "react-router-dom";
import "./SupplyChain.css"; // Import the CSS file for styling

const SupplyChain = () => {
  return (
    <div className="supply-chain-container">
      <h1 className="supply-chain-title">Supply Chain Management</h1>
      <p className="supply-chain-description">
        Manage and track the supply chain of pharmaceutical products efficiently and securely.
      </p>
      <div className="supply-chain-links">
        <Link to="/track-product" className="supply-chain-link">
          Track Product
        </Link>
        <Link to="/roles" className="supply-chain-link">
          Manage Roles
        </Link>
        <Link to="/add-medicine" className="supply-chain-link">
          Add Medicine
        </Link>
      </div>
    </div>
  );
};

export default SupplyChain;