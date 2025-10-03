const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");
// const userController = require('../controllers/userController');
const app = express();
app.use(express.json())


// Define user-related routes here
router.get("/", (req, res) => {
  res.send("owner route is workinggg");
});

router.post("/create", async (req, res) => {
  let owners = await ownerModel.find();
  if (owners.length > 0) {
    return res.status(400).json({ message: "Owner already exists" });
  }
  let { fullname, email, password } = req.body;
  let createdOwner = await ownerModel.create({
    fullname,
    email,
    password,
  });
  return res.status(200).send({ message: "Owner created", owner: createdOwner });
});

module.exports = router;