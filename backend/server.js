import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import dns from 'dns';

//Change DNS
dns.setServers(['1.1.1.1', '8.8.8.8']);

// load env variables before anything else
dotenv.config();

// connect database
connectDB();

const app = express();

// middleware setup
app.use(cors());
app.use(express.json());

import authRoutes from './routes/authRoutes.js';
import calculatorRoutes from './routes/calculatorRoutes.js';
import userRoutes from './routes/userRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import journalRoutes from './routes/journalRoutes.js';

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/calc', calculatorRoutes);
app.use('/api/user', userRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/journal', journalRoutes);

// quick health check route
app.get('/', (req, res) => {
  res.json({ message: 'CaloryInsight API is running' });
});

// global error handler - must be after routes
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
