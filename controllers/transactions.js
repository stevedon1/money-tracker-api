const Transaction = require('../models/Transaction');

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a transaction
const createTransaction = async (req, res) => {
  const { type, category, description, amount, date } = req.body;
  try {
    const newTransaction = new Transaction({ userId, type, category, description, amount, date });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getTransactions, createTransaction };
