const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require("path");
const secret = fs.readFileSync(path.resolve('jwt.evaluation.key'), { encoding: "utf-8" });

const generateToken = (payload) => {
  console.log('O segredo é: ',secret)
  const Token = jwt.sign(payload, secret, {
    algorithm: 'HS256',
  });
  return Token;
};

const verifyToken = (token) => {
  try {
    const result = jwt.verify(token, secret);
    return result;
  } catch (_error) {
    return false;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};