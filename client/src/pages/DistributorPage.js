import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';
import axios from 'axios';
import './DistributorPage.css'; // Import the CSS file for styling

const DistributorPage = () => {
  const [batchId, setBatchId] = useState('');
  const [batchDetails, setBatchDetails] = useState(null);
  const [transportDetails, setTransportDetails] = useState('');
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

  // Handle form submission to log transport details
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transportDetails) {
      setMessage('Please enter transport details.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      // Send transport details to the backend
      await axios.put('http://localhost:5000/api/supply-chain/distributor/log', {
        batchId,
        updatedData: transportDetails,
        role: 'distributor',
      });

      setMessage('Transport details logged successfully!');
      setTransportDetails('');
    } catch (err) {
      console.error('Error logging transport details:', err);
      setMessage('Failed to log transport details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="distributor-page-container">
      <h1 className="distributor-page-title">Distributor Dashboard</h1>
      <p className="distributor-page-description">
        Scan a QR code to retrieve batch details and log transport information.
      </p>

      <div className="qr-scanner-container">
        <QRScanner onScan={handleScan} />
      </div>

      {loading && <p className="loading-message">Loading...</p>}

      {message && <p className="distributor-message">{message}</p>}

      {batchDetails && (
        <div className="batch-details-container">
          <h3>Batch Details:</h3>
          <p><strong>Batch ID:</strong> {batchId}</p>
          <p><strong>Details:</strong> {batchDetails.data}</p>
          <p><strong>Role:</strong> {batchDetails.role}</p>

          <form onSubmit={handleSubmit} className="transport-form">
            <textarea
              placeholder="Enter transport details (e.g., temperature, checkpoints)"
              value={transportDetails}
              onChange={(e) => setTransportDetails(e.target.value)}
              className="form-textarea"
              aria-label="Transport Details"
            />
            <button
              type="submit"
              className="form-button"
              disabled={loading}
            >
              {loading ? 'Logging...' : 'Log Transport Details'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DistributorPage;