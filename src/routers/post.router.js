const express = require('express');
const { 
  createPost,
  getAllPosts,
  getPostById,
  updatePost, 
} = require('../controllers/post.controller');
const validateToken = require('../middlewares/validateToken');
const validatePost = require('../middlewares/validatePost');
const validateUpdatePost = require('../middlewares/validateupdatePost');

const router = express.Router();

router.post('/post', validateToken, validatePost, createPost);
router.get('/post', validateToken, getAllPosts);
router.get('/post/:id', validateToken, getPostById);
router.put('/post/:id', validateToken, validateUpdatePost, updatePost);

module.exports = router;