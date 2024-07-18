const express = require('express');
const {
    getAllOnboardingApplications,
    getOnboardingApplicationById,
    updateOnboardingApplicationById,
    createNewOnboardingApplication,
} = require('../controllers/onboardingController');



const onboardingRouter = express.Router();
onboardingRouter.get('/', getAllOnboardingApplications);
onboardingRouter.get('/:id', getOnboardingApplicationById);
onboardingRouter.put('/:id', updateOnboardingApplicationById);
onboardingRouter.post('/', createNewOnboardingApplication);


module.exports = onboardingRouter;