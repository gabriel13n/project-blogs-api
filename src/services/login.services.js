const { User } = require('../models');
const { createToken } = require('../auth/jwt.auth');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return { type: 'invalid_fields' };
  }

  const token = createToken(user);

  return { type: null, message: token };
};

module.exports = {
  login,
};