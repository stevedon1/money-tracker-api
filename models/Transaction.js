const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  description: String,
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
