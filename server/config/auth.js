const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./db'); // Import JWT secret from db.js

// Middleware to verify JWT token
exports.ensureAuthenticated = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.redirect('/auth/login');

  try {
    const decoded = jwt.verify(token, jwtSecret); // Use jwtSecret from db.js
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    res.redirect('/auth/login');
  }
};

// Middleware to set user info for EJS views
exports.setAuthUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, jwtSecret); // Use jwtSecret from db.js
      res.locals.user = decoded; // Attach user info to locals
    } catch (err) {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
};
