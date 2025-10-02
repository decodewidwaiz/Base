const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname:String,
    secondname:String,
    email:String,
    password:String,
    cart:{
        type: Array,
        default:[]
    },
    isadmin:Boolean,
    contact:Number,
    
})
module.exports=mongoose.model('user',userSchema)