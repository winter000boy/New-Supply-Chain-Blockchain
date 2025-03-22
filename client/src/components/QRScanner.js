import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

const QRScanner = ({ onScan }) => {
  const [scanResult, setScanResult] = useState('');

  // Handle QR code scan result
  const handleScan = (data) => {
    if (data) {
      setScanResult(data); // Update the scanned result
      if (onScan) {
        onScan(data); // Pass the result to the parent component
      }
    }
  };

  // Handle errors during scanning
  const handleError = (error) => {
    console.error('QR Scanner Error:', error);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>QR Code Scanner</h2>
      <div style={{ margin: '20px auto', width: '300px' }}>
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      {scanResult && (
        <div style={{ marginTop: '20px' }}>
          <h3>Scanned Data:</h3>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;