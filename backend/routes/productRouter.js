const express = require('express');
const multer = require('multer');
const { storage } = require('../config/cloudinary.js'); // Import storage configuration
// const isLoggedIn = require('../middlewares/isloggedin');
const {createProduct, updateProduct, deleteProduct, getAllProducts, getProductDetails} = require('../controllers/productController');
const router = express.Router();

// Configure multer with Cloudinary storage
const upload = multer({ storage });

// Define product related routes here
// router.get('/shop', isLoggedIn, (req, res) => {
router.get('/', (req, res)=> res.send('Shop route is working'))
router.get('/shop', getAllProducts)
router.post('/createproduct', upload.single('image'), createProduct)
router.post('/updateproduct/:id', upload.single('image'), updateProduct)
router.post('/deleteproduct/:id', deleteProduct)
router.get('/product/:id', getProductDetails)

module.exports = router;