const express = require('express');
const { createUser, getAllUsers } = require('../controllers/user.controller');
const validateEmail = require('../middlewares/validateEmail');
const validateDisplayName = require('../middlewares/validateDisplayName');
const validatePassword = require('../middlewares/validatePassword');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/user', validateDisplayName, validateEmail, validatePassword, createUser);

router.get('/user', validateToken, getAllUsers);

module.exports = router;