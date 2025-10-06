const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");
const {register, login, logout} = require('../controllers/ownerController');
const app = express();
app.use(express.json())


// Define user-related routes here
router.get("/", (req, res) => {
  res.send("owner route is workinggg");
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;