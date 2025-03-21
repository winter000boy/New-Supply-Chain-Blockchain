import React from "react";
import Tracking from "../components/Tracking";

const TrackingPage = () => {
  return (
    <div>
      <h1>Product Tracking</h1>
      <p>
        Track the history and current status of products in the supply chain. Enter the product ID below to get detailed information.
      </p>

      {/* Tracking Component */}
      <Tracking />
    </div>
  );
};

export default TrackingPage;