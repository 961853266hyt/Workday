const express = require('express');


const {
    getAllUsers,
    updateUserById,
    fetchUserById,
    fetchAllEmployees
} = require('../controllers/userController');

const userRouter = express.Router();


userRouter.get('/', getAllUsers);
userRouter.get('/:id', fetchUserById);
userRouter.put('/:id', updateUserById);
userRouter.get('/HR/employees', fetchAllEmployees);


module.exports = userRouter;