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

const getUserByid = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await userServices.getUserByid(id);

  if (type) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  return res.status(200).json(message);
};

const removeUser = async (req, res) => {
  const userId = req.user.id;

  const { message } = await userServices.removeUser(userId);

  return res.status(204).json(message);
};

module.exports = { 
  createUser,
  getAllUsers,
  getUserByid,
  removeUser,
};