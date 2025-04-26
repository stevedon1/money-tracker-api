const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// POST /api/auth/register
router.post('/register', createUser);

// POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;
