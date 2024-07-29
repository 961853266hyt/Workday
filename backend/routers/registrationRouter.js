const express = require('express');
const {
    generateTokenAndSendEmail,
    getAllTokens,
    authenticateToken,
} = require('../controllers/registrationController');


const registrationRouter = express.Router();
registrationRouter.post('/generate-token', generateTokenAndSendEmail);
registrationRouter.get('/', getAllTokens);
registrationRouter.post('/:token', authenticateToken);


module.exports = registrationRouter;