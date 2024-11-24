const express = require('express');// Import Express
const router = express.Router(); // Create a router instance
const assignmentController = require('../controllers/assignmentController'); // Import assignment controllers

// Routes

// Route to list all assignments
router.get('/', assignmentController.getAllAssignments);

// Route to render the "Create Assignment" form
router.get('/new', assignmentController.renderCreateForm);

// Route to create a new assignment
router.post('/', assignmentController.createAssignment);

// Route to render the "Edit Assignment" form
router.get('/:id/edit', assignmentController.renderEditForm);

// Route to update an existing assignment
router.put('/:id', assignmentController.updateAssignment);

// Route to delete an assignment
router.delete('/:id', assignmentController.deleteAssignment);


module.exports = router; // Export the router
