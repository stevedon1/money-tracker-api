import Transaction from '../models/Transaction.js';

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a transaction
export const createTransaction = async (req, res) => {
  const { type, category, paymentMethod, description, amount, date } = req.body;
  try {
    const newTransaction = new Transaction({ userId: req.user.id, type, category, paymentMethod, description, amount, date });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// module.exports = { getTransactions, createTransaction };
