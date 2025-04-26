const express = require('express');
const router = express.Router();
const { getTransactions, createTransaction } = require('../controllers/transactionController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, getTransactions);
router.post('/',verifyToken, createTransaction);

module.exports = router;
