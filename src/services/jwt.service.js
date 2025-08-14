const jwt = require('jsonwebtoken');

const generateToken = (uid) => {
  return jwt.sign({ uid }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

module.exports = {
  generateToken,
};
