// 3rd Party Modules
const express = require('express');

// Local Modules
const authController = require('../controllers/authController');

// Initialization
const authRouter = express();

// Requests
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = authRouter;