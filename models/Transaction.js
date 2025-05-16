import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: {
  type: String,
  enum: [
    'Housing',
    'Food & Groceries',
    'Transportation',
    'Income & Salary',
    'Utilities & Bills',
    'Savings & Investments',
    'Health & Insurance',
    'Education & Childcare',
    'Entertainment & Lifestyle',
    'Miscellaneous'
  ],
  required: true
},
  paymentMethod: { type: String, enum: ['mpesa', 'cash', 'bank'], required: true },
  description: String,
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);

