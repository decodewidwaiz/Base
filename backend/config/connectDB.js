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
        // Check if MONGODB_URI is defined
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // Remove deprecated options
        });
        
        isConnected = true;
        console.log("MongoDB connected successfully");
        return conn;
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        // Don't exit the process in a serverless environment
        // Just log the error and let the application handle it
        throw error;
    }
}

module.exports = connectDB;