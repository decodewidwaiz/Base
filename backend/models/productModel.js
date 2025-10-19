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
    bgColor: String || optional,
    panelColor: String || optional,
    textColor: String || optional,
    image: {
        public_id: String,
        url: String
    }
});

module.exports = mongoose.model("product", productSchema);