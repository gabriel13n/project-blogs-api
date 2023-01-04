const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const min = 6;

  if (password.length < min) {
    return res.status(400)
    .json({ message: '"password" length must be at least 6 characters long' });
  }

  return next();
};

module.exports = validatePassword;