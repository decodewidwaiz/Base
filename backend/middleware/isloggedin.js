const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async (req, res, next)=>{
    if(!req.cookies.token){
        return res.status(401).json({
            success: false,
            message: "User not authenticated - No token provided"
        });
    }
    
    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        
        if(!decoded){
            return res.status(401).json({
                success: false,
                message: "User not authenticated - Invalid token"
            });
        }
        
        let user = await userModel.findOne({email: decoded.email}).select("-password");
        
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not authenticated - User not found"
            });
        }
        
        req.user = user;
        next();
    }catch(err){
        return res.status(401).json({
            success: false,
            message: "User not authenticated - Token verification failed"
        });
    }
}