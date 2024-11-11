const express = require('express');
const bcrypt = require('bcryptjs');  // Using bcryptjs for hashing
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Assuming you have a User model
require('dotenv').config();

const app = express();
app.use(express.json());  // To parse JSON request body

// Register User
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        // Check if the email already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already in use' });

        // Check if the username already exists
        const usernameExists = await User.findOne({ username });
        if (usernameExists) return res.status(400).json({ message: 'Username already in use' });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Error registering user. Please try again.' });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token as a response
        res.json({ token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Setup routes for Register and Login
app.post('/register', exports.register);
app.post('/login', exports.login);

// Connect to MongoDB and start the server
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(5000, () => {
            console.log('Server running on port 5000');
        });
    })
    .catch((err) => console.log('MongoDB connection error:', err));
