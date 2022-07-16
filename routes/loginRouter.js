const express = require('express');
const loginController = require('../controllers/loginController.js');
const { authenticate } = require('../auth/jwt.js');

const User = require('../models/user.js');

const router = express.Router();

router.route('/')
    .get(authenticate)
    .post(loginController.login);

module.exports = router;