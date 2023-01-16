const postService = require('../services/post.service');

const createPost = async (req, res) => {
  console.log(req.user);
  const userId = req.user.id;

  const { title, content, categoryIds } = req.body;

  const { type, message } = await postService.createPost({ title, content, userId, categoryIds });

  if (type) {
    return res.status(400).json({ message });
  }

  return res.status(201).json(message);
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postService.getAllPosts();
    return res.status(200).json(allPosts);
  } catch (error) {
    return error;
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await postService.getPostById(id);

    if (type) {
      return res.status(404).json({ message });
    }

    return res.status(200).json(message);
  } catch (error) {
    return error;
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};