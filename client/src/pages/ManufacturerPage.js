import React, { useState } from 'react';
import QRScanner from '../components/QRScanner';
import axios from 'axios';

const ManufacturerPage = () => {
  const [batchId, setBatchId] = useState('');
  const [batchDetails, setBatchDetails] = useState(null);
  const [updatedData, setUpdatedData] = useState('');
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

  // Handle form submission to update production details
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!updatedData) {
      alert('Please enter production details.');
      return;
    }

    try {
      setLoading(true);

      // Send updated production details to the backend
      await axios.put('http://localhost:5000/api/supply-chain/manufacturer/update', {
        batchId,
        updatedData,
        role: 'manufacturer',
      });

      alert('Production details updated successfully!');
      setUpdatedData('');
    } catch (err) {
      console.error('Error updating production details:', err);
      alert('Failed to update production details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{ color: '#28a745' }}>Manufacturer Dashboard</h1>
      <p>Scan a QR code to retrieve batch details and update production information.</p>

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
              placeholder="Enter updated production details"
              value={updatedData}
              onChange={(e) => setUpdatedData(e.target.value)}
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
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
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