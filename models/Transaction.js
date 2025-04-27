import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, enum: ['mobile money', 'cash'], required: true },
  description: String,
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);

