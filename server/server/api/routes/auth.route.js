const express = require('express');
const router = express.Router();
const AuthController = require('../../modules/auth/auth.controller');
const AuthMiddleware = require('../middleware/auth.middleware')

// User Authentication
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/profile',AuthMiddleware.authenticate, AuthController.getProfile);  // Admin access required

module.exports = router;
