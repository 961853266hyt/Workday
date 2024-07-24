const express = require('express');

const {
    getAllVisaStatuses,
    getVisaStatusById,
    updateVisaStatusById,
    getVisaStatusByUserId,
    createVisaStatus,
    updateVisaStatusByUserId
} = require('../controllers/visaStatusController');

const visaStatusRouter = express.Router();

visaStatusRouter.get('/', getAllVisaStatuses);
visaStatusRouter.get('/:id', getVisaStatusById);
visaStatusRouter.patch('/:id', updateVisaStatusById);
visaStatusRouter.get('/user/:userId', getVisaStatusByUserId);
visaStatusRouter.get('/user/:userId', getVisaStatusByUserId);
visaStatusRouter.patch('/user/:userId', updateVisaStatusByUserId);
visaStatusRouter.post('/', createVisaStatus);   

module.exports = visaStatusRouter;