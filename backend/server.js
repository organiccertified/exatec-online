// Backend server entry point for Hostinger
// Install dependencies: npm install express cors dotenv pg

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables based on NODE_ENV
// In development: loads .env.development (when running npm run dev)
// In production: loads .env.production (when running npm start)
// Default to development if NODE_ENV is not set
const nodeEnv = process.env.NODE_ENV || 'development';
const envFile = nodeEnv === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

// Set NODE_ENV if not already set (for npm run dev)
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173'
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbEnv = process.env.NODE_ENV === 'development' ? 'TEST' : 'PRODUCTION';
  res.json({ 
    status: 'ok', 
    message: 'Backend server is running',
    environment: process.env.NODE_ENV || 'development',
    database: dbEnv,
    timestamp: new Date().toISOString()
  });
});

// API Routes
import citiesRoutes from './routes/cities.js';
import usersRoutes from './routes/users.js';
app.use('/api/cities', citiesRoutes);
app.use('/api/users', usersRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  const dbEnv = process.env.NODE_ENV === 'development' ? 'TEST' : 'PRODUCTION';
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: ${dbEnv}`);
});

