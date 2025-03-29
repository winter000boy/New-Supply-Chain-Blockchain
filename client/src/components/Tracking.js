import React, { useState } from "react";
import { getProductHistory, getProductStatus } from "../services/trackingService";
import "./Tracking.css"; // Import the CSS file for styling

const Tracking = () => {
  const [productId, setProductId] = useState("");
  const [history, setHistory] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleGetHistory = async () => {
    if (!productId.trim()) {
      setMessage("Please enter a valid product ID.");
      return;
    }

    setLoading(true); // Start loading
    setMessage(""); // Clear previous messages

    try {
      const response = await getProductHistory(productId);
      setHistory(response.data.history);
      setMessage("");
    } catch (err) {
      setMessage(`Error fetching product history: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleGetStatus = async () => {
    if (!productId.trim()) {
      setMessage("Please enter a valid product ID.");
      return;
    }

    setLoading(true); // Start loading
    setMessage(""); // Clear previous messages

    try {
      const response = await getProductStatus(productId);
      setStatus(response.data.status);
      setMessage("");
    } catch (err) {
      setMessage(`Error fetching product status: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="tracking-container">
      <h2 className="tracking-title">Track Product</h2>
      <div className="form-group">
        <label htmlFor="productId">Product ID:</label>
        <input
          id="productId"
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter product ID"
          className="form-input"
          aria-label="Product ID"
        />
      </div>
      <div className="button-group">
        <button
          onClick={handleGetHistory}
          className="tracking-button"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Loading..." : "Get Product History"}
        </button>
        <button
          onClick={handleGetStatus}
          className="tracking-button"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Loading..." : "Get Product Status"}
        </button>
      </div>
      {history && (
        <div className="tracking-result">
          <h3>Product History:</h3>
          <pre>{JSON.stringify(history, null, 2)}</pre>
        </div>
      )}
      {status && (
        <div className="tracking-result">
          <h3>Product Status:</h3>
          <p>{status}</p>
        </div>
      )}
      {message && <p className="tracking-message">{message}</p>}
    </div>
  );
};

export default Tracking;