import express from 'express';
import { MongoClient } from 'mongodb';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8000;
const uri = process.env.MONGODB_URI; // Corrected MongoDB URI reference

let mongoClient;

// MongoDB connection setup
async function connectToMongoDB() {
    try {
        mongoClient = new MongoClient(uri);
        await mongoClient.connect();
        console.log("Connected to MongoDB Atlas!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit if connection fails
    }
}

// Middleware to enable CORS for all origins
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Middleware to pass MongoDB client to routes
app.use((req, res, next) => {
    req.dbClient = mongoClient.db('Employee'); // Set your database name here
    next();
});

// Use the authentication routes
app.use('/auth', authRoutes);

// Start the server and connect to MongoDB
app.listen(port, async () => {
    await connectToMongoDB();
    console.log(`Server is running on port ${port}`);
});

// Close MongoDB connection on server shutdown
process.on('SIGINT', async () => {
    if (mongoClient) {
        await mongoClient.close();
        console.log("MongoDB connection closed");
    }
    process.exit(0);
});
