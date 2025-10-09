const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config//connectDB');

const port = process.env.PORT || 3000;


app.use(cookieParser());

// Configure CORS to allow requests from frontend origin
const corsOptions = {
  origin: 'http://localhost:5173', // frontend origin
  credentials: true, // allow session cookies
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//importing routes
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const ownerRouter = require('./routes/ownerRouter');

// main route for health check
app.get('/', (req, res) => {
  res.send('server is running....');
});


app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/owner', ownerRouter)

connectDB();
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});