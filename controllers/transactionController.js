import Transaction from '../models/Transaction.js';

// Get all transactions for the authenticated user
export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the JWT in auth middleware

    const transactions = await Transaction.find({ user: userId }).sort({ date: -1 });

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
