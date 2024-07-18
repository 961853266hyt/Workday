const express = require('express');


const {
    getAllUsers,
    updateUserById,
    fetchUserById,
} = require('../controllers/userController');

const userRouter = express.Router();


userRouter.get('/', getAllUsers);
userRouter.get('/:id', fetchUserById);
userRouter.put('/:id', updateUserById);


module.exports = userRouter;