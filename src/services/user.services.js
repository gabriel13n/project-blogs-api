const { User } = require('../models');
const { createToken } = require('../auth/jwt.auth');

const createUser = async ({ displayName, email, password, image }) => {
  const userAlreadyExists = await User.findOne({
    where: { email },
  });

  if (userAlreadyExists) {
    return { type: 'User already registered' };
  }

  const user = await User.create({
    displayName,
    email,
    password,
    image,
  });

  const token = createToken(user);
  return { type: null, message: token };
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return { type: null, message: users };
};

const getUserByid = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return { type: 'User does not exist' };
  }

  return { type: null, message: user };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByid,
};