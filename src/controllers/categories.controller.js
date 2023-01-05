const { createCategory, getAllCategories } = require('../services/categories.services');

const create = async (req, res) => {
  const newCategory = req.body;

  const { message } = await createCategory(newCategory);

  return res.status(201).json(message);
};

const getAll = async (req, res) => {
  const { message } = await getAllCategories();

  return res.status(200).json(message);
};

module.exports = {
  create,
  getAll,
};