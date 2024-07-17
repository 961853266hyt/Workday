require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const errors = [];
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            errors.push({ field: 'username', message: 'Username already exists' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            errors.push({ field: 'email', message: 'Email already exists' });
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' });
        res.status(201).json({ user: {id: user._id, username, role}, token }); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const signIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User
            .findOne({ username })
            .select('username password role');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' });
        res.json({ user: {id: user._id, username, role: user.role}, token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const verifyToken = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decoded.id).select('username role');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user: {id: user._id, username: user.username, role: user.role} });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const fetchUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createUser,
    signIn,
    verifyToken,
    getAllUsers,
    fetchUserById,
    updateUserById
};