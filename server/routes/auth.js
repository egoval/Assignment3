const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes for authentication
router.get('/register', authController.renderRegister);
router.post('/register', authController.registerUser);
router.get('/login', authController.renderLogin);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

module.exports = router;
