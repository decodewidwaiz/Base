const express = require('express');
// const isLoggedIn = require('../middlewares/isloggedin');
const router = express.Router();
// const userController = require('../controllers/userController');
router.use(express.json());
router.use(express.urlencoded({extended: true}));


// Define user-related routes here
// router.get('/shop', isLoggedIn, (req, res) => {
router.get('/shop', (req, res) => {
    res.send('product route is working');
})

module.exports = router;