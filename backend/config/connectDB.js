const mongoose = require("mongoose");

// database connection function
const connectDB = () =>{
    try {
        mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/tests");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}
module.exports = connectDB;