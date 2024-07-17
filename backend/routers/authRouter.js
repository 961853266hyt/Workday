const express = require('express');
const { 
    createUser, 
    signIn, 
    verifyToken 
} = require('../controllers/userController');

const authRouter = express.Router();


authRouter.post('/signup', createUser);
authRouter.post('/signin', signIn);
authRouter.post('/verifyToken', verifyToken);

module.exports = authRouter;

