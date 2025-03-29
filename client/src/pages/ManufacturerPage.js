import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';
import axios from 'axios';
import './ManufacturerPage.css'; // Import the CSS file for styling

const ManufacturerPage = () => {
  const [batchId, setBatchId] = useState('');
  const [batchDetails, setBatchDetails] = useState(null);
  const [updatedData, setUpdatedData] = useState('');
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

  // Handle form submission to update production details
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!updatedData) {
      setMessage('Please enter production details.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      // Send updated production details to the backend
      await axios.put('http://localhost:5000/api/supply-chain/manufacturer/update', {
        batchId,
        updatedData,
        role: 'manufacturer',
      });

      setMessage('Production details updated successfully!');
      setUpdatedData('');
    } catch (err) {
      console.error('Error updating production details:', err);
      setMessage('Failed to update production details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manufacturer-page-container">
      <h1 className="manufacturer-page-title">Manufacturer Dashboard</h1>
      <p className="manufacturer-page-description">
        Scan a QR code to retrieve batch details and update production information.
      </p>

      <div className="qr-scanner-container">
        <QRScanner onScan={handleScan} />
      </div>

      {loading && <p className="loading-message">Loading...</p>}

      {message && <p className="manufacturer-message">{message}</p>}

      {batchDetails && (
        <div className="batch-details-container">
          <h3>Batch Details:</h3>
          <p><strong>Batch ID:</strong> {batchId}</p>
          <p><strong>Details:</strong> {batchDetails.data}</p>
          <p><strong>Role:</strong> {batchDetails.role}</p>

          <form onSubmit={handleSubmit} className="production-form">
            <textarea
              placeholder="Enter updated production details"
              value={updatedData}
              onChange={(e) => setUpdatedData(e.target.value)}
              className="form-textarea"
              aria-label="Updated Production Details"
            />
            <button
              type="submit"
              className="form-button"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Production Details'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManufacturerPage;