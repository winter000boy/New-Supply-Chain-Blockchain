const QRCode = require('qrcode');
const { parse } = require('url');

// Function to generate a QR code
const generateQRCode = async (data) => {
  try {
    // Generate QR code as a data URL (base64 image)
    const qrCode = await QRCode.toDataURL(data);
    console.log('QR Code generated successfully');
    return qrCode;
  } catch (err) {
    console.error('Error generating QR Code:', err);
    throw new Error('Failed to generate QR Code');
  }
};

// Function to decode a QR code (if needed for server-side decoding)
const decodeQRCode = async (qrCodeDataURL) => {
  try {
    // Decode the QR code (if you have a decoding library or service)
    // For now, this is a placeholder as QR decoding is typically done on the frontend
    console.log('Decoding QR Code is not implemented on the server');
    return null;
  } catch (err) {
    console.error('Error decoding QR Code:', err);
    throw new Error('Failed to decode QR Code');
  }
};

// Function to parse QR code data (e.g., extract batch ID from a URL)
const parseQRCodeData = (qrCodeData) => {
  try {
    const parsedData = parse(qrCodeData, true); // Parse the QR code data as a URL
    console.log('Parsed QR Code data:', parsedData);
    return parsedData.query; // Return the query parameters (e.g., batchId)
  } catch (err) {
    console.error('Error parsing QR Code data:', err);
    throw new Error('Failed to parse QR Code data');
  }
};

module.exports = {
  generateQRCode,
  decodeQRCode,
  parseQRCodeData,
};