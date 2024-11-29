const express = require('express'); // Import Express framework
const bodyParser = require('body-parser'); // Middleware to parse form data
const methodOverride = require('method-override');// Allow PUT and DELETE in forms
const path = require('path');// Utility to handle file paths
const cookieParser = require('cookie-parser');
const authRoutes = require('../routes/auth');
const { ensureAuthenticated, setAuthUser } = require('./auth');
const app = express(); // Create an instance of the Express application
app.use(setAuthUser);
// Protect routes for assignments
app.use('/assignments', ensureAuthenticated, assignmentRoutes);
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
// Middleware to parse cookies
app.use(cookieParser());

// Middleware to set user info for EJS views

// Database Connection

// Use authentication routes
app.use('/auth', authRoutes);

// Routes
const assignmentRoutes = require('../routes/assignments');
app.use('/assignments', assignmentRoutes);

// Home Route
app.get('/', (req, res) => {
  res.render('index', { title: 'Assignment Tracker' });
});

module.exports = app;
