const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// const job = require('./lib/cron')
import job from "./lib/cron"
const app = express();
const PORT = process.env.PORT || 3001

job.start()
// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{res.send("Server running now on port 5000")})
// Routes
const transactionRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionRoutes);

const userRoutes = require('./routes/userRoutes');
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
