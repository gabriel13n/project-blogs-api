const express = require('express');
const { login } = require('../controllers/login.controller');
const loginValidation = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/login', loginValidation, login);

module.exports = router;