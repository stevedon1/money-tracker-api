import express  from 'express';
import { createUser, loginUser } from '../controllers/userController.js';
const router = express.Router();

// POST /api/auth/register
router.post('/register', createUser);

// POST /api/auth/login
router.post('/login', loginUser);

// module.exports = router;
export default router;
