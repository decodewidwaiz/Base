const mongoose = require("mongoose")

const ownerSchema = new mongoose.Schema({
    firstname:String,
    secondname:String,
    email:String,
    password:String,
    products:{
        type: Array,
        default:[]
    },
    gstin:Number,
    contact:Number,
    
})
module.exports=mongoose.model('owner',ownerSchema)