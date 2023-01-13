const express = require('express');
const { createPost } = require('../controllers/post.controller');
const validateToken = require('../middlewares/validateToken');
const validatePost = require('../middlewares/validatePost');

const router = express.Router();

router.post('/post', validateToken, validatePost, createPost);

module.exports = router;