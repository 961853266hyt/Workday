import { Router } from 'express';
import { createUser, signIn, verifyToken } from '../controllers/userController';

export const authRouter = Router();


authRouter.post('/signup', createUser);
authRouter.post('/signin', signIn);
authRouter.post('/verifyToken', verifyToken);