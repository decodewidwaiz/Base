const userModel = require("../models/userModel");
const productModel= require("../models/productModel");


module.exports.cart = async (req, res) => {
  try {
    // Verify authentication
    if (!req.user || !req.user.email) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    // Find user and populate cart
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate({
        path: 'cart',
        select: 'name price image discount' // Select only needed fields
      })
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Initialize cart if undefined
    const cart = user.cart || [];

    // Calculate pricing
    const subtotal = cart.reduce((total, item) => {
      const price = Number(item.price) || 0;
      return total + price;
    }, 0);

    const shippingFee = cart.length > 0 ? 20 : 0;
    const discount = Number(req.query.discount) || 0;
    const finalAmount = Math.max(0, subtotal + shippingFee - discount);

    res.status(200).json({
      success: true,
      cart: cart,
      cartCount: cart.length,
      pricing: {
        subtotal: parseFloat(subtotal.toFixed(2)),
        shippingFee: shippingFee,
        discount: discount,
        finalAmount: parseFloat(finalAmount.toFixed(2))
      }
    });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: err.message
    });
  }
}
module.exports.useraddress=async function(req, res) {
    try {
        const { userId, street, city, state, postalCode, country } = req.body;

        // Validate required fields
        if (!userId || !street || !city || !state || !postalCode || !country) {
            return res.status(400).json({
                success: false,
                message: "All address fields are required"
            });
        }

        // Find and update user with new address
        const user = await userModel.findByIdAndUpdate(
            userId,
            {
                address: {
                    street,
                    city,
                    state,
                    postalCode,
                    country
                }
            },
            { 
                new: true, // Return the updated document
                runValidators: true // Run schema validators
            }
        );

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: {
                userId: user._id,
                address: user.address
            }
        });

    } catch (err) {
        console.error("Error updating user address:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};
module.exports.addtocart=async (req, res) => {
  try {
    // Verify authentication
    if (!req.user || !req.user.email) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const productId = req.params.productid;

    // Validate ObjectId format
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format"
      });
    }

    // Check if product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Find user
    const user = await userModel.findOne({ email: req.user.email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Initialize cart if undefined
    if (!user.cart) {
      user.cart = [];
    }

    // Check if product already in cart
    const productExists = user.cart.some(
      item => item.toString() === productId
    );

    if (productExists) {
      return res.status(400).json({
        success: false,
        message: "Product already in cart"
      });
    }

    // Add product to cart
    user.cart.push(productId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cartCount: user.cart.length
    });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({
      success: false,
      message: "Error adding product to cart",
      error: err.message
    });
  }
};
module.exports.removefromcart=async (req, res) => {
  try {
    // Verify authentication
    if (!req.user || !req.user.email) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const productId = req.params.productid;

    // Validate ObjectId format
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format"
      });
    }

    // Find user
    const user = await userModel.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if product exists in cart
    const productIndex = user.cart.findIndex(
      item => item.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart"
      });
    }

    // Remove product from cart
    user.cart.splice(productIndex, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      cartCount: user.cart.length
    });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({
      success: false,
      message: "Error removing product from cart",
      error: err.message
    });
  }
};