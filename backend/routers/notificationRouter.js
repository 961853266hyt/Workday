const express = require('express');
const notificationRouter = express.Router();
const { sendNotification } = require('../controllers/notificationController');

// Define the route for sending notifications
notificationRouter.post('/', sendNotification);

module.exports = notificationRouter;