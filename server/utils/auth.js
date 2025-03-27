const jwt = require("jsonwebtoken");

/**
 * Generate a JWT token for a user.
 * @param {Object} user - The user object containing id, email, and role.
 * @returns {string} - The generated JWT token.
 */
const generateToken = (user) => {
  try {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Generate the token with a 1-hour expiration
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
  } catch (err) {
    console.error("Error generating token:", err.message);
    throw new Error("Failed to generate token");
  }
};

/**
 * Verify a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {Object} - The decoded token payload.
 */
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("Error verifying token:", err.message);
    throw new Error("Invalid or expired token");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};