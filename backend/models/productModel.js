const mongoose = require("mongoose");

//basic product schema
const productSchema = new mongoose.Schema({
    picture: String,
    name: String,
    price: Number,
    discount: {
        type:Number,
        default:0
    },
    bgColor: String,
    panelColor: String,
    textColor: String,
});

module.exports = mongoose.model("product", productSchema);