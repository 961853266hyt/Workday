require('dotenv').config();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const RegistrationToken = require('../models/RegistrationToken');

const generateTokenAndSendEmail = async (req, res) => {
    const { email, name } = req.body;

    // Generate token
    const token = crypto.randomBytes(20).toString('hex'); 
    const expiration = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours from now

    const registrationToken = new RegistrationToken({ token, email, name, expiration });
    await registrationToken.save();

    // Send email
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        to: email,
        from: process.env.EMAIL_USER,
        subject: 'Registration Token',
        text: `Hello ${name},\n\nPlease use the following link to complete your registration: \n\n${process.env.FRONTEND_URL}/registration/${token}\n\nThis link will expire in 3 hours.\n`
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to send email' });
        }
        res.status(200).json({ message: 'Email sent successfully' });
    });
};

const getAllTokens = async (req, res) => {
    try {
        const tokens = await RegistrationToken.find();
        res.json(tokens);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const authenticateToken = async (req, res) => {
    const { token } = req.params;

    try {
        const registrationToken = await RegistrationToken.findOne({ token });

        if (!registrationToken) {
            return res.status(404).json({ message: 'Invalid registration link' });
        }

        if (registrationToken.expiration < Date.now()) {
            return res.status(400).json({ message: 'Registration link has expired' });
        }

        if (registrationToken.status === 'Submitted' || registrationToken.status === 'Used') {
            return res.status(400).json({ message: 'Registration link has already been used' });
        }


        res.json({ email: registrationToken.email, name: registrationToken.name });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
    


module.exports = {
    generateTokenAndSendEmail,
    getAllTokens,    
    authenticateToken,
};