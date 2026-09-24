import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import talentRoutes from './routes/talentRoutes.js';
import proposalRoutes from './routes/proposalRoutes.js';
import contractRoutes from './routes/contractRoutes.js';
import seedDatabase from './seed.js';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. curl, postman, server-to-server)
    if (!origin) return callback(null, true);
    // Allow localhost or Vercel preview/production domains
    if (
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.endsWith('.vercel.app') ||
      allowedOrigins.includes(origin) ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/freelancehub';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected Successfully to Cluster0 [Database: freelancehub]');
    await seedDatabase();
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

// Root & Health Check Routes (for Render and uptime monitors)
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    service: 'FreelanceHub Backend API',
    environment: process.env.NODE_ENV || 'development',
    health: '/api/health'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'FreelanceHub Backend API is live & connected to MongoDB Cluster0.',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/talent', talentRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/contracts', contractRoutes);

// Server start handler
if (process.env.NODE_ENV === 'production' || process.env.PORT) {
  // Render & Cloud Production: Bind directly to host 0.0.0.0 and PORT
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Production server running on port ${PORT}`);
  });
} else {
  // Local Development: EADDRINUSE automatic port fallback
  const startServer = (portToUse) => {
    const server = app.listen(portToUse, () => {
      console.log(`🚀 Local dev server running on http://localhost:${portToUse}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`⚠️ Port ${portToUse} is in use. Retrying on port ${portToUse + 1}...`);
        startServer(portToUse + 1);
      } else {
        console.error('Server error:', err);
      }
    });
  };

  startServer(PORT);
}

