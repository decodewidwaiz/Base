const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  try {
    // Check if req.body exists
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }
    
    let {fullname, email, password } = req.body;
    
    // Check if required fields are present
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: "Fullname, email, and password are required" });
    }
    
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create new user
    let newUser = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    let token = generateToken(newUser);
    
    // Set cookie
    res.cookie("token", token);
    
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email
      },
      token: token
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while registering the user" });
  }
};

module.exports.login = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "invalid credentials" });
  }
  // comparing the password
  bcrypt.compare(password, user.password, function (err, result) {
    if(result){
        let token = generateToken(user);
        res.cookie("token", token);
        res.status(200).json({ message: "Login successful", user })
    }
    else{
      res.status(400).json({ error: "invalid credentials" });
    }
  });
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
}