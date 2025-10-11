const express = require("express");
const router = express.Router();
const isloggedin = require("../middleware/isloggedin");
const {register, login, logout} = require('../controllers/authcontroller');
const {cart} = require('../controllers/userController');
const {useraddress, addtocart, removefromcart} = require("../controllers/userController");
router.use(express.json());

router.get("/", (req, res) => {
  res.send("User route is working");
});

// Define user-related routes here
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/cart", cart);
router.post("/address",useraddress)
router.post("/addtocart/:productid",addtocart);
router.delete("/cart/:productid",removefromcart);




module.exports = router;
