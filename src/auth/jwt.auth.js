const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 123456;

const header = { expiresIn: '15min', algorithm: 'HS256' };

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ data: userWithoutPassword }, JWT_SECRET, header);

  return token;
};

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, JWT_SECRET);
    return data;
  } catch (err) {
    return false;
  }
};

module.exports = { createToken, validateToken };