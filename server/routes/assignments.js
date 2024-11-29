const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { ensureAuthenticated } = require('../config/auth'); // Import middleware

// Apply middleware to protect routes
router.get('/', assignmentController.getAllAssignments); // Public route for listing assignments
router.get('/new', ensureAuthenticated, assignmentController.renderCreateForm); // Protected
router.post('/', ensureAuthenticated, assignmentController.createAssignment); // Protected
router.get('/:id/edit', ensureAuthenticated, assignmentController.renderEditForm); // Protected
router.put('/:id', ensureAuthenticated, assignmentController.updateAssignment); // Protected
router.delete('/:id', ensureAuthenticated, assignmentController.deleteAssignment); // Protected

module.exports = router;
