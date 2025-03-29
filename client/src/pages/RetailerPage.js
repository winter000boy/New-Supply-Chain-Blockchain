import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';
import axios from 'axios';
import './RetailerPage.css'; // Import the CSS file for styling

const RetailerPage = () => {
  const [batchId, setBatchId] = useState('');
  const [batchDetails, setBatchDetails] = useState(null);
  const [storageDetails, setStorageDetails] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle QR code scan
  const handleScan = async (scannedData) => {
    try {
      setBatchId(scannedData);
      setLoading(true);
      setMessage('');

      // Fetch batch details from the backend
      const response = await axios.get(`http://localhost:5000/api/supply-chain/batch/${scannedData}`);
      setBatchDetails(response.data.data);
    } catch (err) {
      console.error('Error fetching batch details:', err);
      setMessage('Failed to fetch batch details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission to confirm receipt and storage
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storageDetails) {
      setMessage('Please enter storage details.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      // Send storage details to the backend
      await axios.put('http://localhost:5000/api/supply-chain/retailer/confirm', {
        batchId,
        updatedData: storageDetails,
        role: 'retailer',
      });

      setMessage('Receipt and storage details confirmed successfully!');
      setStorageDetails('');
    } catch (err) {
      console.error('Error confirming receipt and storage:', err);
      setMessage('Failed to confirm receipt and storage. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="retailer-page-container">
      <h1 className="retailer-page-title">Retailer Dashboard</h1>
      <p className="retailer-page-description">
        Scan a QR code to retrieve batch details and confirm receipt and storage conditions.
      </p>

      <div className="qr-scanner-container">
        <QRScanner onScan={handleScan} />
      </div>

      {loading && <p className="loading-message">Loading...</p>}

      {message && <p className="retailer-message">{message}</p>}

      {batchDetails && (
        <div className="batch-details-container">
          <h3>Batch Details:</h3>
          <p><strong>Batch ID:</strong> {batchId}</p>
          <p><strong>Details:</strong> {batchDetails.data}</p>
          <p><strong>Role:</strong> {batchDetails.role}</p>

          <form onSubmit={handleSubmit} className="storage-form">
            <textarea
              placeholder="Enter storage details (e.g., temperature, conditions)"
              value={storageDetails}
              onChange={(e) => setStorageDetails(e.target.value)}
              className="form-textarea"
              aria-label="Storage Details"
            />
            <button
              type="submit"
              className="form-button"
              disabled={loading}
            >
              {loading ? 'Confirming...' : 'Confirm Receipt & Storage'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RetailerPage;