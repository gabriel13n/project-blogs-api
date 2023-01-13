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

module.exports = {
  createPost,
};