const { BlogPost, Category, PostCategory, User } = require('../models');

const INCLUDE_ARRAY = [
  {
    model: User,
    as: 'user',
    attributes: { exclude: ['password'] },
  },
  {
    model: Category,
    as: 'categories',
    through: { attributes: [] },
  },
];

const createPost = async ({ title, content, userId, categoryIds }) => {
  const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });

  if (count !== categoryIds.length || categoryIds.length === 0) {
    return { type: 'Category not found', message: 'one or more "categoryIds" not found' };
  }

  const post = await BlogPost
  .create({ title, content, userId, updated: new Date(), published: new Date() });

  const postCategoryIds = categoryIds
  .map((categoryId) => ({ postId: post.dataValues.id, categoryId }));

  await PostCategory.bulkCreate(postCategoryIds);

  return { type: null, message: post };
};

const getAllPosts = async () => {
  const allPosts = await BlogPost.findAll({
    include: INCLUDE_ARRAY,
  });

  return allPosts;
};

const getPostById = async (id) => {
  const postById = await BlogPost.findByPk(id, {
    include: INCLUDE_ARRAY,
  });

  if (!postById) {
    return { type: 'post not found', message: 'Post does not exist' };
  }

  return { type: null, message: postById };
};

const updatePost = async (id, title, content, userId) => {
  const postById = await getPostById(id);

  if (postById.message.userId !== userId) {
    return { type: 'not authorized', message: 'Unauthorized user' };
  }

  await BlogPost.update(({ title, content, updated: new Date() }), {
    where: { id },
  });

  const postUpdated = await getPostById(id);

  return postUpdated;
};

const deletePost = async (id, userId) => {
  const postById = await BlogPost.findByPk(id);

  if (!postById) {
    return { type: 'post not found', message: 'Post does not exist' };
  }
  
  if (postById.userId !== userId) {
    return { type: 'not authorized', message: 'Unauthorized user' };
  }

  await BlogPost.destroy({ where: { id } });
  return {};
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJkaXNwbGF5TmFtZSI6ImdhYmlydSB0ZXN0dHR0IiwiZW1haWwiOiJ0ZXN0dHR0QGdtYWkuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpbWFnZSI6Imh0dHA6Ly80LmJwLmJsb2dzcG90LmNvbS9fWUE1MGFkUS03dlEvUzFnZlJfNnVmcEkvQUFBQUFBQUFBQWsvMUVySkdnUldaRGcvUzQ1L2JyZXR0LnBuZyJ9LCJpYXQiOjE2NzM5NzAxMDQsImV4cCI6MTY3Mzk3MTkwNH0.wyBT2I50q8cq8QZ8ZBLRzMJCjlhzGfG_vOzJmfMO0rg
module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};