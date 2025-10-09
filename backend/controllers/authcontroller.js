const userModel = require("../models/userModel");
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
          const user = await userModel.findOne({ email });
          // console.log(user);
          if (user) {
            return res.status(400).json({ error: "User already exists" });
          }
          let newUser = await userModel.create({
            fullname,
            email,
            password: hash,
          });

          // setting up jwt token
          let token = generateToken(newUser);
          // adding cookie in the browser
          res.cookie("token", token);
          
          res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
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