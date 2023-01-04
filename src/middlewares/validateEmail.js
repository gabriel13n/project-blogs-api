const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const validEmail = regex.test(email);

  if (!validEmail) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  return next();
};

module.exports = validateEmail;
