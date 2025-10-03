const mongoose = require("mongoose");

//basic product schema
const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: number,
    discount: {
        type:Number,
        default:0
    },
    bgColor: String,
    panelColor: String,
    textColor: String,
});

module.exports = mongoose.model("product", productSchema);