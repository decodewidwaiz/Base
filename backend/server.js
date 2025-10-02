const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require("./config/mongodbcon")
const expressSesssion = require("express-session")
const flash = require("flash")

const port = process.env.BACKEND_PORT || 3000;

const ownerRouter = require("./routes/ownerRouter")
const productRouter= require("./routes/productRouter")
const userRouter = require("./routes/userRouter")

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));


app.use("/owner",ownerRouter)
app.use("/user",userRouter)
app.use("/product",productRouter)

app.get('/api/health', (req, res) => {
  res.send('API is healthy');
});

// main route for server's health check
app.get('/', (req, res) => {
  res.send('server is running updated....');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});