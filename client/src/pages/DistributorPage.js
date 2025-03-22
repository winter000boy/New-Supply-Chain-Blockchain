import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';
import axios from 'axios';

const DistributorPage = () => {
  const [batchId, setBatchId] = useState('');
  const [batchDetails, setBatchDetails] = useState(null);
  const [transportDetails, setTransportDetails] = useState('');
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

  // Handle form submission to log transport details
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transportDetails) {
      alert('Please enter transport details.');
      return;
    }

    try {
      setLoading(true);

      // Send transport details to the backend
      await axios.put('http://localhost:5000/api/supply-chain/distributor/log', {
        batchId,
        updatedData: transportDetails,
        role: 'distributor',
      });

      alert('Transport details logged successfully!');
      setTransportDetails('');
    } catch (err) {
      console.error('Error logging transport details:', err);
      alert('Failed to log transport details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{ color: '#ffc107' }}>Distributor Dashboard</h1>
      <p>Scan a QR code to retrieve batch details and log transport information.</p>

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
              placeholder="Enter transport details (e.g., temperature, checkpoints)"
              value={transportDetails}
              onChange={(e) => setTransportDetails(e.target.value)}
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
                backgroundColor: '#ffc107',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
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