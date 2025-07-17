
import dotenv from 'dotenv';
import express from 'express';
import mongoose from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import limiter from './middleware/rateLimiter.js';
import cors from 'cors';

import './cron/resetLoginAttempts.js';

const app = express();

dotenv.config();
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://mern-signin-up-demo.netlify.app',
  'https://mern-signin-up-demo.netlify.app/',
  'https://mern-signin-signout.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(limiter);
// app.use(mongoose)

mongoose.connection.once('open', () => {
    console.log('✅ MongoDB connection is open.');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});


app.use('/auth', authRoutes);
app.use('/user', userRoutes);
