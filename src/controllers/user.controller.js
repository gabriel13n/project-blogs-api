const userServices = require('../services/user.services');

const createUser = async (req, res) => {
  const newUser = req.body;
  const { type, message } = await userServices.createUser(newUser);

  if (type) {
    return res.status(409).json({ message: 'User already registered' });
  }

  return res.status(201).json({ token: message });
};

const getAllUsers = async (req, res) => {
  const { message } = await userServices.getAllUsers();

  return res.json(message);
};

module.exports = { createUser, getAllUsers };