const jwt = require('jsonwebtoken');

const secret = 'SegreDo';

const generateToken = (payload) => {
  const Token = jwt.sign(payload, secret, {
    algorithm: 'HS256',
  });
  return Token;
};

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = {
  generateToken,
  verifyToken,
};