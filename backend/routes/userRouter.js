const express = require("express");
const router = express.Router();
const {register, login, logout} = require('../controllers/authController');
// const cookieParser = require("cookie-parser");
router.use(express.json());

router.get("/", (req, res) => {
  res.send("User route is working");
});

// Define user-related routes here
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
