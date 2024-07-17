// const express = require('express');
// const router = express.Router();
// const Employee = require('../models/Employee');

// router.get('/', async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.patch('/:employeeId/visa/:visaId', async (req, res) => {
//   try {
//     const { employeeId, visaId } = req.params;
//     const { status } = req.body;
    
//     const employee = await Employee.findById(employeeId);
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     const visaStatus = employee.visaStatus.id(visaId);
//     if (!visaStatus) {
//       return res.status(404).json({ message: 'Visa status not found' });
//     }

//     visaStatus.status = status;
//     await employee.save();
//     res.json(employee);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// module.exports = router;