// Serverless function handler for Vercel
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import postRoutes from '../routes/posts.js';
import categoryRoutes from '../routes/categories.js';
import authRoutes from '../routes/auth.js';
import uploadRoutes from '../routes/upload.js';
import notificationRoutes from '../routes/notifications.js';
import userRoutes from '../routes/users.js';
import contactRoutes from '../routes/contact.js';
import commentRoutes from '../routes/comments.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// MongoDB connection for serverless
let isConnected = false;

async function connectToDatabase() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

// Initialize connection
connectToDatabase().catch(console.error);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Ensure DB connection before processing requests
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(503).json({
      success: false,
      error: 'Database connection unavailable',
      message: error.message
    });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'MERN Blog API is running',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Simple test route that doesn't need DB
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API routes working',
    routes: [
      '/api/posts',
      '/api/categories',
      '/api/auth',
      '/api/users'
    ]
  });
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({
      status: 'ok',
      database: dbStatus,
      timestamp: new Date().toISOString(),
      env: {
        hasMongoUri: !!process.env.MONGODB_URI,
        hasJwtSecret: !!process.env.JWT_SECRET
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// API routes
console.log('Registering routes...');
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/posts', commentRoutes);
app.use('/api/comments', commentRoutes);
console.log('Routes registered successfully');

// 404 handler - must be after all routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
    method: req.method,
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  });
});

export default app;

