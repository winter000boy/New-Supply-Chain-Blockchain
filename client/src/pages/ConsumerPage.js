import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';
import axios from 'axios';
import './ConsumerPage.css'; // Import the CSS file for styling

const ConsumerPage = () => {
  const [batchId, setBatchId] = useState('');
  const [productHistory, setProductHistory] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle QR code scan
  const handleScan = async (scannedData) => {
    try {
      setBatchId(scannedData);
      setLoading(true);
      setMessage('');

      // Fetch product history from the backend
      const response = await axios.get(`http://localhost:5000/api/supply-chain/batch/${scannedData}`);
      setProductHistory(response.data.data);
    } catch (err) {
      console.error('Error fetching product history:', err);
      setMessage('Failed to fetch product history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consumer-page-container">
      <h1 className="consumer-page-title">Consumer Dashboard</h1>
      <p className="consumer-page-description">
        Scan a QR code to verify product authenticity and view its full history.
      </p>

      <div className="qr-scanner-container">
        <QRScanner onScan={handleScan} />
      </div>

      {loading && <p className="loading-message">Loading...</p>}

      {message && <p className="consumer-message">{message}</p>}

      {productHistory && (
        <div className="product-history-container">
          <h3>Product History:</h3>
          <p><strong>Batch ID:</strong> {batchId}</p>
          <p><strong>Details:</strong> {productHistory.data}</p>
          <p><strong>Last Updated By:</strong> {productHistory.role}</p>
        </div>
      )}
    </div>
  );
};

export default ConsumerPage;