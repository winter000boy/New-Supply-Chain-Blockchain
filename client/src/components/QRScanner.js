import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import './QRScanner.css'; // Import the CSS file for styling

const QRScanner = ({ onScan }) => {
  const [scanResult, setScanResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle QR code scan result
  const handleScan = (data) => {
    if (data) {
      setScanResult(data); // Update the scanned result
      setErrorMessage(''); // Clear any previous error
      if (onScan) {
        onScan(data); // Pass the result to the parent component
      }
    }
  };

  // Handle errors during scanning
  const handleError = (error) => {
    console.error('QR Scanner Error:', error);
    setErrorMessage('An error occurred while scanning. Please try again.');
  };

  return (
    <div className="qr-scanner-container">
      <h2>QR Code Scanner</h2>
      <div className="qr-scanner">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      {errorMessage && <p className="qr-error">{errorMessage}</p>}
      {scanResult && (
        <div className="qr-scan-result">
          <h3>Scanned Data:</h3>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;