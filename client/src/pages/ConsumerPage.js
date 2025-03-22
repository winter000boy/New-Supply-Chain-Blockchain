import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';
import axios from 'axios';

const ConsumerPage = () => {
  const [batchId, setBatchId] = useState('');
  const [productHistory, setProductHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle QR code scan
  const handleScan = async (scannedData) => {
    try {
      setBatchId(scannedData);
      setLoading(true);

      // Fetch product history from the backend
      const response = await axios.get(`http://localhost:5000/api/supply-chain/batch/${scannedData}`);
      setProductHistory(response.data.data);
    } catch (err) {
      console.error('Error fetching product history:', err);
      alert('Failed to fetch product history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{ color: '#6f42c1' }}>Consumer Dashboard</h1>
      <p>Scan a QR code to verify product authenticity and view its full history.</p>

      <div style={{ marginTop: '20px' }}>
        <QRScanner onScan={handleScan} />
      </div>

      {loading && <p>Loading...</p>}

      {productHistory && (
        <div style={{ marginTop: '20px' }}>
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