import * as dotenv from 'dotenv';
dotenv.config();
// import { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET as string, {
            expiresIn: '1d',
        });
        res.status(201).json({ user: { id: newUser._id, username, role }, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//use username instead of email
export const signIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User
            .findOne({ username })
            .select('username password role');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET as string, {
            expiresIn: '1d',
        });
        res.status(200).json({ user: { id: user._id, username, role: user.role }, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const verifyToken = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET as string);
        const user = await User.findById((decoded as any).id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user: { id: user._id, username: user.username, role: user.role }, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const fetchUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, req
            .body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




