import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // MongoDB connection
import authRoutes from './routes/authRoutes.js'; // Authentication routes
import upload from './Middleware/upload.js';  // Profile routes (multer middleware)
import bodyParser from 'body-parser'; // For parsing request bodies
import session from 'express-session'; // Session management
import connectMongo from 'connect-mongo'; // For MongoDB session store
import dotenv from 'dotenv'; // For loading environment variables

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// MongoDB connection
connectDB();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS options for frontend and backend interaction
const corsOptions = {
    origin: ['http://localhost:3000', '*'], // Adjust based on your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow cookies
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Use session management (optional if needed for your app)
app.use(session({
    store: connectMongo.create({
        mongoUrl: process.env.MONGODB_URI, // MongoDB URI for session store
        collectionName: 'sessions', // Session collection name
    }),
    secret: process.env.JWT_SECRET, // Secret for signing the session
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
}));

// Simple route for checking server health
app.get('/', (req, res) => {
    res.send("User Profile API");
});

// Authentication and profile routes
app.use('/auth', authRoutes);

// Use multer upload middleware only in routes where file upload is needed
// For example, create a route for uploading a profile image
app.post('/upload', upload.single('profileImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(200).send('File uploaded successfully');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
