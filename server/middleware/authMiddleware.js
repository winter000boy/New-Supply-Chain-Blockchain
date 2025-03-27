const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided or malformed header.' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (err) {
    console.error('Authentication error:', err.message);
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

/**
 * Middleware to authorize users based on their roles.
 * @param {Array} roles - Array of roles allowed to access the route.
 */
const authorize = (roles) => (req, res, next) => {
  try {
    // Ensure roles is an array
    if (!Array.isArray(roles)) {
      throw new Error('Roles must be an array.');
    }

    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }

    next();
  } catch (err) {
    console.error('Authorization error:', err.message);
    res.status(403).json({ error: 'Access denied. Authorization failed.' });
  }
};

module.exports = { authenticate, authorize };