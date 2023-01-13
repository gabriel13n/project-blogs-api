const { BlogPost, Category, PostCategory } = require('../models');

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

module.exports = {
  createPost,
};