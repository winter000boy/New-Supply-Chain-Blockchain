import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

const SupplierPage = () => {
  const [batchId, setBatchId] = useState('');
  const [data, setData] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!batchId || !data) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);

      // Send batch details to the backend
      const response = await axios.post('http://localhost:5000/api/supply-chain/supplier/log', {
        batchId,
        data,
        role: 'supplier',
      });

      // Set the QR code from the response
      setQrCode(response.data.qrCode);
      alert('Batch details logged successfully!');
    } catch (err) {
      console.error('Error logging batch details:', err);
      alert('Failed to log batch details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{ color: '#007BFF' }}>Supplier Dashboard</h1>
      <p>Log batch details and generate a QR code for tracking.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Enter Batch ID"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
            style={{
              padding: '10px',
              width: '300px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            placeholder="Enter Batch Details"
            value={data}
            onChange={(e) => setData(e.target.value)}
            style={{
              padding: '10px',
              width: '300px',
              height: '100px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          disabled={loading}
        >
          {loading ? 'Logging...' : 'Log Batch & Generate QR Code'}
        </button>
      </form>

      {qrCode && (
        <div style={{ marginTop: '20px' }}>
          <h3>Generated QR Code:</h3>
          <QRCode value={qrCode} size={200} />
          <p style={{ marginTop: '10px', color: '#555' }}>Batch ID: {batchId}</p>
        </div>
      )}
    </div>
  );
};

export default SupplierPage;