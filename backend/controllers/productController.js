const { cloudinary } = require("../config/cloudinary.js"); // Import cloudinary instance
const Product = require("../models/productModel.js");


// Helper function to validate required fields
const validateProductFields = (name, description, price, stock) => {
    if (!name) return "Product name is required.";
    if (!description) return "Product description is required.";
    if (!price || isNaN(price) || price <= 0) return "Valid price is required.";
    // Check if 'stock' is required based on your business logic. 
    // Assuming it is for e-commerce.
    if (stock === undefined || isNaN(stock) || stock < 0) return "Valid stock quantity is required.";
    return null; // No errors
};

// --- OWNER ENDPOINTS ---

const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, discount, bgColor, panelColor, textColor } = req.body;
        const file = req.file; // Multer with Cloudinary storage puts file info here

        // 1. Validate required fields
        const validationError = validateProductFields(name, description, price, stock);
        if (validationError) {
            return res.status(400).json({ message: validationError });
        }

        let imageData = {};
        if (file) {
            // Extract image data from the Cloudinary response
            imageData = { 
                public_id: file.filename,
                url: file.path
            };
        } else {
             return res.status(400).json({ message: "Product image is required." });
        }

        // 3. Create the product
        const product = await Product.create({ 
            name, 
            description: description || "No description provided",
            price, 
            stock,
            image: imageData,
            discount: discount || 0,
            bgColor,
            panelColor,
            textColor
        });
        
        res.status(201).json({ 
            message: "Product created successfully", 
            product
        });

    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Failed to create product." });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const updates = req.body;
        
        // Optional: Perform specific validation for updated fields if needed
        if(updates.price && (isNaN(updates.price) || updates.price <= 0))
            return res.status(400).json({ message: "Valid price must be provided for update." });

        if (req.file) {
            // Delete old image
            if (product.image?.public_id) {
                await cloudinary.uploader.destroy(product.image.public_id);
            }

            // Add new image data
            updates.image = { 
                public_id: req.file.filename,
                url: req.file.path
            };
        }

        const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json({ message: "Product updated successfully", product: updated });

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Failed to update product." });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Delete image from cloudinary
        if (product.image?.public_id) {
            await cloudinary.uploader.destroy(product.image.public_id);
        }

        await product.deleteOne();
        res.json({ message: "Product deleted successfully" });

    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Failed to delete product." });
    }
};


// --- PUBLIC (CUSTOMER) ENDPOINTS ---

const getAllProducts = async (req, res) => {
    try {
        // Fetch all products, possibly with pagination/filtering later
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Failed to retrieve products." });
    }
};

const getProductDetails = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch (error) {
        console.error("Error fetching product details:", error);
        // Mongoose cast errors (invalid ID format) are common here
        res.status(400).json({ message: "Invalid product ID or request failed." });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductDetails
};