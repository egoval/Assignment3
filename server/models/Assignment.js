const mongoose = require('mongoose'); // Import Mongoose

// Define the Assignment schema
const assignmentSchema = new mongoose.Schema({
  title: String, // Title of the assignment
  description: String, // Description of the assignment
  dueDate: Date, // Due date for the assignment
});
// Export the Assignment model
module.exports = mongoose.model('Assignment', assignmentSchema);
