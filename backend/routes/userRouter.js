const express=require("express")
const router = express.Router()
const cookieParser = require("cookie-parser")
const {registerUser,loginUser, logoutUser}= require("../controllers/authcontroller")


router.get("/" ,function(req,res){
    // res.render("landing.ejs")
    res.send("user route")
})

router.post('/login',loginUser)
router.post("/logout",logoutUser)
router.post('/register',registerUser)

module.exports=router;