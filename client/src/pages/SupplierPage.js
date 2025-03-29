import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';
import './SupplierPage.css'; // Import the CSS file for styling

const SupplierPage = () => {
  const [batchId, setBatchId] = useState('');
  const [data, setData] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!batchId || !data) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      // Send batch details to the backend
      const response = await axios.post('http://localhost:5000/api/supply-chain/supplier/log', {
        batchId,
        data,
        role: 'supplier',
      });

      // Set the QR code from the response
      setQrCode(response.data.qrCode);
      setMessage('Batch details logged successfully!');
    } catch (err) {
      console.error('Error logging batch details:', err);
      setMessage('Failed to log batch details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="supplier-page-container">
      <h1 className="supplier-page-title">Supplier Dashboard</h1>
      <p className="supplier-page-description">Log batch details and generate a QR code for tracking.</p>

      <form onSubmit={handleSubmit} className="supplier-form">
        <div className="form-group">
          <label htmlFor="batchId">Batch ID:</label>
          <input
            id="batchId"
            type="text"
            placeholder="Enter Batch ID"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            className="form-input"
            aria-label="Batch ID"
          />
        </div>
        <div className="form-group">
          <label htmlFor="data">Batch Details:</label>
          <textarea
            id="data"
            placeholder="Enter Batch Details"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="form-textarea"
            aria-label="Batch Details"
          />
        </div>
        <button
          type="submit"
          className="form-button"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Logging...' : 'Log Batch & Generate QR Code'}
        </button>
      </form>

      {message && <p className="supplier-message">{message}</p>}

      {qrCode && (
        <div className="qr-code-container">
          <h3>Generated QR Code:</h3>
          <QRCode value={qrCode} size={200} />
          <p className="qr-code-batch-id">Batch ID: {batchId}</p>
        </div>
      )}
    </div>
  );
};

export default SupplierPage;