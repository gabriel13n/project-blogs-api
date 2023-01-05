const express = require('express');
const { create } = require('../controllers/categories.controller');

const validateCategory = require('../middlewares/validateCategory');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/categories', validateToken, validateCategory, create);

module.exports = router;