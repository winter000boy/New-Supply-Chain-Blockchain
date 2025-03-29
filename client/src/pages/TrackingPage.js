import React from "react";
import Tracking from "../components/Tracking";
import "./TrackingPage.css"; // Import the CSS file for styling

const TrackingPage = () => {
  return (
    <div className="tracking-page-container">
      <h1 className="tracking-page-title">Product Tracking</h1>
      <p className="tracking-page-description">
        Track the history and current status of products in the supply chain. Enter the product ID below to get detailed information about its journey.
      </p>

      {/* Tracking Component */}
      <Tracking />
    </div>
  );
};

export default TrackingPage;