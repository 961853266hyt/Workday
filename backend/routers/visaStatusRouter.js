const express = require('express');

const {
    getAllVisaStatuses,
    getVisaStatusById,
    updateVisaStatusById,
    getVisaStatusByUserId,
    createVisaStatus,
    updateVisaStatusByUserId,
    getVisaStatusesInProgress,
    getAllVisaStatusesByHR
} = require('../controllers/visaStatusController');

const visaStatusRouter = express.Router();

visaStatusRouter.get('/', getAllVisaStatuses);
visaStatusRouter.get('/:id', getVisaStatusById);
visaStatusRouter.patch('/:id', updateVisaStatusById);
visaStatusRouter.get('/user/:userId', getVisaStatusByUserId);
visaStatusRouter.get('/user/:userId', getVisaStatusByUserId);
visaStatusRouter.patch('/user/:userId', updateVisaStatusByUserId);
visaStatusRouter.post('/', createVisaStatus);   
visaStatusRouter.get('/HR/inProgress', getVisaStatusesInProgress);
visaStatusRouter.get('/HR/all', getAllVisaStatusesByHR);

module.exports = visaStatusRouter;