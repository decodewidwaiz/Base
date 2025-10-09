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
          // adding cookie in the browser
          res.cookie("token", token);
          
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
  let { email, password } = req.body;

  let owner = await ownerModel.findOne({ email });
  if (!owner) {
    return res.status(400).json({ error: "invalid credentials" });
  }
  // comparing the password
  bcrypt.compare(password, owner.password, function (err, result) {
    if(result){
        let token = generateToken(owner);
        res.cookie("token", token);
        res.status(200).json({ message: "Login successful", owner })
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