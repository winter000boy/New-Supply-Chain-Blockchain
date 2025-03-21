import React, { useState } from "react";
import { getProductHistory, getProductStatus } from "../services/trackingService";

const Tracking = () => {
  const [productId, setProductId] = useState("");
  const [history, setHistory] = useState(null);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const handleGetHistory = async () => {
    try {
      const response = await getProductHistory(productId);
      setHistory(response.data.history);
      setMessage("");
    } catch (err) {
      setMessage(`Error fetching product history: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleGetStatus = async () => {
    try {
      const response = await getProductStatus(productId);
      setStatus(response.data.status);
      setMessage("");
    } catch (err) {
      setMessage(`Error fetching product status: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div>
      <h2>Track Product</h2>
      <div>
        <label>Product ID:</label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter product ID"
        />
      </div>
      <button onClick={handleGetHistory}>Get Product History</button>
      <button onClick={handleGetStatus}>Get Product Status</button>
      {history && (
        <div>
          <h3>Product History:</h3>
          <pre>{JSON.stringify(history, null, 2)}</pre>
        </div>
      )}
      {status && (
        <div>
          <h3>Product Status:</h3>
          <p>{status}</p>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Tracking;