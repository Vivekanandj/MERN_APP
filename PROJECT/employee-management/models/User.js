const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure the username is unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure the email is unique
        lowercase: true, // Optional: Convert email to lowercase
        trim: true, // Optional: Trim whitespace
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    dob: {
        type: Date,
    },
    contact: {
        type: String,
    },
    address: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    description: {
        type: String,
    },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

const User = mongoose.model('User', userSchema);

module.exports = User;
