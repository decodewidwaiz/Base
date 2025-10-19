const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/connectDB');

// Connect to database with error handling
connectDB().catch(err => {
  console.error("Failed to connect to database:", err.message);
  // Continue running the server even if DB connection fails
});

app.use(cookieParser());

// Configure CORS to allow requests from frontend origin
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:5173',
  'https://base-nine-sage.vercel.app', // Your actual backend domain
  'https://basse-khaki.vercel.app', // Frontend domain with typo
  'https://base-khaki.vercel.app' // Frontend domain (if this is the correct one)
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // allow session cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  exposedHeaders: ['Authorization'] // Expose any headers that the frontend needs to access
};

app.use(cors(corsOptions));

// Additional CORS headers middleware (only for Vercel edge cases)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// importing routes
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const ownerRouter = require('./routes/ownerRouter');

// main route for health check
app.get('/', (req, res) => {
  res.send('server is running....');
});

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/owner', ownerRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!', message: err.message });
});

// For Vercel serverless functions, we need to export the app
// Vercel will handle listening
module.exports = app;