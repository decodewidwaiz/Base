const mongoose = require("mongoose");

//basic user schema
const userSchema = new mongoose.Schema({
    fullname: String,
    email: { type: String, unique: true },
    password: String,
    cart: {
        type: Array,
        default: []
    },
    orders:  {
        type: Array,
        default: []
    },
    picture: String,
    
    address: {
        street:{type: String},
        city: {type: String},
        state: {type: String},
        postalCode: {type: String},
        country: {type: String},
        contact: {type: Number},
    }

});

module.exports = mongoose.model("User", userSchema);