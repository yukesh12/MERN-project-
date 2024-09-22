const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController'); // Adjust path as needed

// Get all employees
router.get('/', employeeController.getEmployees);

// Create a new employee
router.post('/', employeeController.createEmployee);

// Get a single employee by ID
router.get('/:id', employeeController.getEmployeeById);

// Update an employee by ID
router.put('/:id', employeeController.updateEmployee);

// Delete an employee by ID
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
