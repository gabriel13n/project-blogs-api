const { validateToken } = require('../auth/jwt.auth');

const validateTokenUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const validateTokenDecoded = validateToken(token);

  if (!validateTokenDecoded) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  return next();
};

module.exports = validateTokenUser;