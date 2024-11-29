const Assignment = require('../models/Assignment');

// List all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.render('assignments/list', { assignments });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Render Create Form
exports.renderCreateForm = (req, res) => {
  res.render('assignments/create');
};

// Create a new assignment
exports.createAssignment = async (req, res) => {
  try {
    await Assignment.create(req.body);
    res.redirect('/assignments');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Render Edit Form
exports.renderEditForm = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    res.render('assignments/edit', { assignment });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update an assignment
exports.updateAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/assignments');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete an assignment
exports.deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.redirect('/assignments');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
