import { Request, Response } from 'express';
import User from '../models/User';
import Employee from '../models/Employee';
import HR from '../models/HR';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { role, ...userData } = req.body;
    
    let user;
    if (role === 'EMP') {
      user = new Employee(userData);
    } else if (role === 'HR') {
      user = new HR(userData);
    } else {
      return res.status(400).send('Invalid role');
    }
    
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};