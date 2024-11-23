require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
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
