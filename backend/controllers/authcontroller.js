const bcrypt=require('bcrypt')
const jwt = require("jsonwebtoken")
const {generateToken}=require("../utils/generateToken")
const userModel = require("../models/user")




module.exports.registerUser = async(req,res)=>{
    let{email,password,firstname,secondname}=req.body;
    let user = await userModel.findOne({email})
    if(user) return res.status(500).send("User already registered")

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let user = await userModel.create({
                firstname,
                email,
                
                secondname,
                password:hash

            })
            let token = generateToken(user)
            res.cookie("token",token)
            res.send("done")
        })
    })
}
module.exports.loginUser = async(req,res)=>{
    let{email,password}=req.body;
    let user = await userModel.findOne({email})
    if(!user) return res.status(500).send("something went wrong")

    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token = generateToken(user);
            res.cookie("token",token)
            res.status(200).send("you can login")
        }
        else {
            res.send("email or password incorrect")
            res.redirect("/login")}
    })
}
module.exports.logoutUser = (req,res)=>{
    res.cookie("token","")
    res.send("you are logged out")
}