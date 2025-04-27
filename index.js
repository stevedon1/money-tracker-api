import express  from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactions.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();
import job from "./lib/cron.js"
const app = express();
const PORT = process.env.PORT || 3001

job.start()
// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{res.send("Server running now on port 5000")})
// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
