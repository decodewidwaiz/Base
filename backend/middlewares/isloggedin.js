const jwt = require("jsonwebtoken")
const userModel = require("../models/user")

module.exports = async function (req,res,next){
    if(req.cookies.token ==""){
        res.flash("you must be logged in before doing something ");
    return res.redirect("/")}
    else{
        try{
        let data = jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user = await userModel
        .findOne({email:data.email})
        .select("-password")
        req.user = user;
        next();}
        catch(err){
            req.flash("error","something went wrong")
            res.redirect("/")

        }
}}