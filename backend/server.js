const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const port = process.env.BACKEND_PORT || 3000;


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// main route for server's health check
app.get('/', (req, res) => {
  res.send('server is running updated....');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});