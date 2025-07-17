const jwt = require('jsonwebtoken');

/**
 * Generate JWT token with user email and ID
 * @param {Object} user - User object containing id and email
 * @returns {String} JWT token
 */
exports.generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};
