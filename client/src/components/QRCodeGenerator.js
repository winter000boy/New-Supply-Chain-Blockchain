import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [inputData, setInputData] = useState('');
  const [qrCodeData, setQRCodeData] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  // Generate QR Code
  const generateQRCode = () => {
    if (inputData.trim() === '') {
      alert('Please enter some data to generate a QR code.');
      return;
    }
    setQRCodeData(inputData);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter data for QR code"
        value={inputData}
        onChange={handleInputChange}
        style={{ padding: '10px', width: '300px', marginBottom: '10px' }}
      />
      <br />
      <button
        onClick={generateQRCode}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Generate QR Code
      </button>
      <div style={{ marginTop: '20px' }}>
        {qrCodeData && (
          <div>
            <h3>Generated QR Code:</h3>
            <QRCode value={qrCodeData} size={200} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;