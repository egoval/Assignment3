const express = require('express'); // Import Express framework
const bodyParser = require('body-parser'); // Middleware to parse form data
const path = require('path');// Utility to handle file paths

const app = express(); // Create an instance of the Express application

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Database Connection


// Routes
const assignmentRoutes = require('../routes/assignments');
app.use('/assignments', assignmentRoutes);

// Home Route
app.get('/', (req, res) => {
  res.render('index', { title: 'Assignment Tracker' });
});

module.exports = app;
