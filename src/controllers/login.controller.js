const loginServices = require('../services/login.services');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await loginServices.login(email, password);

  if (type) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  return res.status(200).json({ token: message });
};

module.exports = {
  login,
};