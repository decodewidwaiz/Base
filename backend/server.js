const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/connectDB');

// Connect to database
connectDB();

app.use(cookieParser());

// Configure CORS to allow requests from frontend origin
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:5173',
  'https://base-nine-sage.vercel.app' // Your frontend domain
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
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

app.use(cors(corsOptions));

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