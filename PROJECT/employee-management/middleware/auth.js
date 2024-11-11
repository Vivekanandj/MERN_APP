const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Assuming you have a User model
require('dotenv').config();

const auth = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization');

  // If no token, return authorization error
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Decode the token and get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user exists in MongoDB using the decoded user ID
    const user = await User.findById(decoded.user.id);  // Assuming `id` is in the decoded token

    if (!user) {
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }

    // Attach the user data to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle errors (invalid token, expired token, etc.)
    console.error(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
