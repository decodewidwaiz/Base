const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async (req, res, next)=>{
    // Check if token exists in cookies
    if(!req.cookies.token){
        return res.status(401).json({
            success: false,
            message: "User not authenticated - No token provided"
        });
    }
    
    try{
        // Verify the token
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        
        if(!decoded){
            return res.status(401).json({
                success: false,
                message: "User not authenticated - Invalid token"
            });
        }
        
        // Find user in database
        let user = await userModel.findOne({email: decoded.email}).select("-password");
        
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not authenticated - User not found"
            });
        }
        
        // Attach user to request object
        req.user = user;
        next();
    }catch(err){
        console.error("Authentication error:", err);
        return res.status(401).json({
            success: false,
            message: "User not authenticated - Token verification failed",
            error: err.message
        });
    }
}