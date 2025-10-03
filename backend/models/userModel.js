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
    contact: Number,
});

module.exports = mongoose.model("User", userSchema);