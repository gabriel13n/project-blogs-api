const { User } = require('../models');
const { createToken } = require('../auth/jwt.auth');

const createUser = async ({ displayName, email, password, image }) => {
  const userAlreadyExists = await User.findOne({
    where: { email },
  });

  if (userAlreadyExists) {
    return { type: 'User already registered' };
  }

  await User.create({
    displayName,
    email,
    password,
    image,
  });

  const token = createToken(email);
  return { type: null, message: token };
};

module.exports = {
  createUser,
};