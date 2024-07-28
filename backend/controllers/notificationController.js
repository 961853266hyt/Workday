require('dotenv').config();
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Function to send notification email
const sendNotificationEmail = async (userEmail, userName, nextStep) => {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail', // or another service you use
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS
    }
  });

  // Email content
  let mailOptions = {
    from: `"Workday" <${process.env.EMAIL_USER}>`, 
    to: userEmail,                                 // list of receivers
    subject: 'Your Next Steps for OPT Document Submission',
    text: `Dear ${userName},\n\nYour next step is: ${nextStep}.\n\nBest regards,\nWorkday Team`
  };

  // Send mail
  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
};

const sendNotification = async (req, res) => {
  const { userId, nextStep } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Determine the next step for the user
    if (!nextStep) {
      nextStep = 'Submit your application';
    }

    // Send notification email
    await sendNotificationEmail(user.email, user.username, nextStep);

    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send notification' });
  }
};

module.exports = {
  sendNotification
};