const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure the email is unique
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,  // To store the file path if an image is uploaded
  },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
