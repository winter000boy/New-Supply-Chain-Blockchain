import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';
import axios from 'axios';

const RetailerPage = () => {
  const [batchId, setBatchId] = useState('');
  const [batchDetails, setBatchDetails] = useState(null);
  const [storageDetails, setStorageDetails] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle QR code scan
  const handleScan = async (scannedData) => {
    try {
      setBatchId(scannedData);
      setLoading(true);

      // Fetch batch details from the backend
      const response = await axios.get(`http://localhost:5000/api/supply-chain/batch/${scannedData}`);
      setBatchDetails(response.data.data);
    } catch (err) {
      console.error('Error fetching batch details:', err);
      alert('Failed to fetch batch details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission to confirm receipt and storage
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storageDetails) {
      alert('Please enter storage details.');
      return;
    }

    try {
      setLoading(true);

      // Send storage details to the backend
      await axios.put('http://localhost:5000/api/supply-chain/retailer/confirm', {
        batchId,
        updatedData: storageDetails,
        role: 'retailer',
      });

      alert('Receipt and storage details confirmed successfully!');
      setStorageDetails('');
    } catch (err) {
      console.error('Error confirming receipt and storage:', err);
      alert('Failed to confirm receipt and storage. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{ color: '#17a2b8' }}>Retailer Dashboard</h1>
      <p>Scan a QR code to retrieve batch details and confirm receipt and storage conditions.</p>

      <div style={{ marginTop: '20px' }}>
        <QRScanner onScan={handleScan} />
      </div>

      {loading && <p>Loading...</p>}

      {batchDetails && (
        <div style={{ marginTop: '20px' }}>
          <h3>Batch Details:</h3>
          <p><strong>Batch ID:</strong> {batchId}</p>
          <p><strong>Details:</strong> {batchDetails.data}</p>
          <p><strong>Role:</strong> {batchDetails.role}</p>

          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <textarea
              placeholder="Enter storage details (e.g., temperature, conditions)"
              value={storageDetails}
              onChange={(e) => setStorageDetails(e.target.value)}
              style={{
                padding: '10px',
                width: '300px',
                height: '100px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
            <br />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#17a2b8',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
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