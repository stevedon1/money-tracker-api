import express from 'express';
const router = express.Router();
import { getTransactions, createTransaction } from '../controllers/transactionController.js';
import verifyToken from '../middleware/authMiddleware.js';

router.get('/', verifyToken, getTransactions);
router.post('/',verifyToken, createTransaction);

export default router;
