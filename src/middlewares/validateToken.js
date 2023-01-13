const { validateToken } = require('../auth/jwt.auth');
const userService = require('../services/user.services');

const validateTokenUser = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const validateTokenDecoded = validateToken(token);

  if (!validateTokenDecoded) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  const user = await userService.getUserByid(validateTokenDecoded.data.id);
  req.user = user.message;

  return next();
};

module.exports = validateTokenUser;