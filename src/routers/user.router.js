const express = require('express');
const { createUser } = require('../controllers/user.controller');
const validateEmail = require('../middlewares/validateEmail');
const validateDisplayName = require('../middlewares/validateDisplayName');
const validatePassword = require('../middlewares/validatePassword');

const router = express.Router();

router.post('/user', validateDisplayName, validateEmail, validatePassword, createUser);

module.exports = router;