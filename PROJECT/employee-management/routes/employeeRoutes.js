const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const upload = require('../middleware/upload');

// Create Employee
router.post('/employees', upload.single('image'), employeeController.createEmployee);

// Get All Employees
router.get('/employees', employeeController.getEmployees);

// Get Single Employee by ID
router.get('/employees/:id', employeeController.getEmployeeById);

// Update Employee
router.put('/employees/:id', upload.single('image'), employeeController.updateEmployee);

// Delete Employee
router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router;
