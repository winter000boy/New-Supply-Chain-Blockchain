import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './QRCodeGenerator.css'; // Import the CSS file for styling

const QRCodeGenerator = () => {
  const [inputData, setInputData] = useState('');
  const [qrCodeData, setQRCodeData] = useState('');
  const [error, setError] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setInputData(e.target.value);
    setError(''); // Clear error message on input change
  };

  // Generate QR Code
  const generateQRCode = () => {
    if (inputData.trim() === '') {
      setError('Please enter some data to generate a QR code.');
      return;
    }
    setQRCodeData(inputData);
  };

  // Download QR Code as an image
  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    downloadLink.click();
  };

  return (
    <div className="qr-generator-container">
      <h2>QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter data for QR code"
        value={inputData}
        onChange={handleInputChange}
        className="qr-input"
        aria-label="Enter data for QR code"
      />
      {error && <p className="qr-error">{error}</p>}
      <button onClick={generateQRCode} className="qr-button">
        Generate QR Code
      </button>
      <div className="qr-code-display">
        {qrCodeData && (
          <div>
            <h3>Generated QR Code:</h3>
            <QRCode value={qrCodeData} size={200} />
            <button onClick={downloadQRCode} className="qr-download-button">
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;