const express = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/authController');

const router = express.Router();

// Login Route
router.post('/login', [
    check('userName', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
], login);

// Register Route
router.post('/register', [
    check('userName', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
], register);

module.exports = router;
