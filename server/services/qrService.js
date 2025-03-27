const QRCode = require('qrcode');
const { parse } = require('url');

/**
 * Generate a QR code as a data URL (base64 image).
 * @param {string} data - The data to encode in the QR code.
 * @returns {Promise<string>} - The generated QR code as a base64 string.
 */
const generateQRCode = async (data) => {
  try {
    const qrCode = await QRCode.toDataURL(data);
    console.log('QR Code generated successfully');
    return qrCode;
  } catch (err) {
    console.error('Error generating QR Code:', err.message);
    throw new Error('Failed to generate QR Code');
  }
};

/**
 * Decode a QR code (placeholder for server-side decoding).
 * @param {string} qrCodeDataURL - The QR code data URL to decode.
 * @returns {null} - Decoding is not implemented on the server.
 */
const decodeQRCode = async (qrCodeDataURL) => {
  try {
    console.log('Decoding QR Code is not implemented on the server');
    return null; // Placeholder for decoding logic
  } catch (err) {
    console.error('Error decoding QR Code:', err.message);
    throw new Error('Failed to decode QR Code');
  }
};

/**
 * Parse QR code data (e.g., extract batch ID from a URL).
 * @param {string} qrCodeData - The QR code data to parse.
 * @returns {Object} - The parsed query parameters from the QR code data.
 */
const parseQRCodeData = (qrCodeData) => {
  try {
    const parsedData = parse(qrCodeData, true); // Parse the QR code data as a URL
    console.log('Parsed QR Code data:', parsedData);
    return parsedData.query; // Return the query parameters (e.g., batchId)
  } catch (err) {
    console.error('Error parsing QR Code data:', err.message);
    throw new Error('Failed to parse QR Code data');
  }
};

module.exports = {
  generateQRCode,
  decodeQRCode,
  parseQRCodeData,
};