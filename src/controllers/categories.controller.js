const { createCategory } = require('../services/categories.services');

const create = async (req, res) => {
  const newCategory = req.body;

  const { message } = await createCategory(newCategory);

  return res.status(201).json(message);
};

module.exports = {
  create,
};