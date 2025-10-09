const mongoose = require("mongoose");

//basic owner schema
const ownerSchema = new mongoose.Schema({
    email: { 
        type: String,
        unique: true 
    },
    password: String,
    products:{
        type: Array,
        default: [] 
    },
    discounts: {
        type: String,
        default: 0
    },
    picture: String,
    gstin: String

});

module.exports = mongoose.model("owner", ownerSchema);