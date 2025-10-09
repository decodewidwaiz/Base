const mongoose = require("mongoose");

//basic product schema
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgColor: String,
    panelColor: String,
    textColor: String,
    image: {
        public_id: String,
        url: String
    }
});

module.exports = mongoose.model("product", productSchema);