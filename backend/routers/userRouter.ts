import { Router } from 'express';
import { 
    getAllUsers,
    updateUserById,
    fetchUserById} 
from '../controllers/userController';

export const userRouter = Router();


userRouter.get('/', getAllUsers);
userRouter.get('/:id', fetchUserById);
userRouter.put('/:id', updateUserById);

