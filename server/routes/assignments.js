const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

// Routes
router.get('/', assignmentController.getAllAssignments);
router.get('/new', assignmentController.renderCreateForm);
router.post('/', assignmentController.createAssignment);
router.get('/:id/edit', assignmentController.renderEditForm);
router.put('/:id', assignmentController.updateAssignment);
router.delete('/:id', assignmentController.deleteAssignment);

module.exports = router;
