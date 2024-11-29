const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Import JWT for token generation and verification
const { jwtSecret } = require('../config/db'); // Import the JWT secret from db.js

// Render the registration page
exports.renderRegister = (req, res) => {
  res.render('auth/register'); // Render the register view
};

// Handle user registration
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body; // Extract user data from request body

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send('Username or email already exists');
    }

    // Create and save the new user
    const user = new User({ username, email, password });
    await user.save();

    // Redirect to the login page after successful registration
    res.redirect('/auth/login');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Error registering user');
  }
};

// Render the login page
exports.renderLogin = (req, res) => {
  res.render('auth/login'); // Render the login view
};

// Handle user login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body; // Extract login credentials from request body

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid username or password'); // User not found
    }

    // Check if the entered password matches the hashed password in the database
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).send('Invalid username or password'); // Invalid password
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Send the token as an HTTP-only cookie
    res.cookie('jwt', token, { httpOnly: true, secure: false }); // Set `secure: true` in production with HTTPS
    res.redirect('/'); // Redirect to the home page
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Error logging in');
  }
};

// Handle user logout
exports.logoutUser = (req, res) => {
  res.clearCookie('jwt'); // Clear the JWT token cookie
  res.redirect('/auth/login'); // Redirect to the login page
};
