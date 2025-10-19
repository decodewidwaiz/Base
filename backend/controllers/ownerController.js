const ownerModel = require("../models/ownerModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

module.exports.register = (req, res) => {
  try {
    let {fullname, email, password } = req.body;
    //hasing our password using bcrypt
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).json({ error: "Error hashing password" });
        } else {
          const user = await ownerModel.findOne({ email });
          // console.log(user);
          if (user) {
            return res.status(400).json({ error: "owner already exists" });
          }
          let owner = await ownerModel.create({
            fullname,
            email,
            password: hash,
          });

          // setting up jwt token
          let token = generateToken(owner);
          
          // Set cookie with proper options for cross-domain requests
          const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
          };
          
          res.cookie("token", token, cookieOptions);
          
          res.status(201).json({
            success: true,
            message: "Owner registered successfully",
            owner: owner,
            token: token
          });
        }
      });
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
};

module.exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let owner = await ownerModel.findOne({ email });
    if (!owner) {
      return res.status(400).json({ error: "invalid credentials" });
    }
    
    // comparing the password
    bcrypt.compare(password, owner.password, function (err, result) {
      if (result) {
        let token = generateToken(owner);
        
        // Set cookie with proper options for cross-domain requests
        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        };
        
        res.cookie("token", token, cookieOptions);
        res.status(200).json({ 
          message: "Login successful", 
          owner: {
            _id: owner._id,
            fullname: owner.fullname,
            email: owner.email
          }
        });
      } else {
        res.status(400).json({ error: "invalid credentials" });
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

module.exports.logout = (req, res) => {
  // Clear the token cookie with proper options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 0 // Expire immediately
  };
  
  res.cookie("token", "", cookieOptions);
  res.status(200).json({ message: "Logged out successfully" });
}