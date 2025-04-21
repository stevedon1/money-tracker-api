const express = require('express');
const router = express.Router();
const { getTransactions, createTransaction } = require('../controllers/transactions');

router.get('/', getTransactions);
router.post('/', createTransaction);

module.exports = router;
