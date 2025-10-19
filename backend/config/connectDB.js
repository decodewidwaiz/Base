const mongoose = require("mongoose");

let isConnected = false; // Track connection status

// database connection function
const connectDB = async () => {
    // If already connected, return without creating a new connection
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // Remove deprecated options
        });
        
        isConnected = true;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;