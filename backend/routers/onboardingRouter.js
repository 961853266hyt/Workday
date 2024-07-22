const express = require('express');
const upload = require('../upload');
const {
    getAllOnboardingApplications,
    getOnboardingApplicationById,
    updateOnboardingApplicationById,
    createNewOnboardingApplication,
    getOnboardingApplicationByUserId
} = require('../controllers/onboardingController');
const { on } = require('events');



const onboardingRouter = express.Router();
onboardingRouter.get('/', getAllOnboardingApplications);
onboardingRouter.get('/:id', getOnboardingApplicationById);
onboardingRouter.put('/:id', updateOnboardingApplicationById);
onboardingRouter.post('/',upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'workAuthorization.optReceipt', maxCount: 1 }]), createNewOnboardingApplication);
onboardingRouter.get('/user/:userId', getOnboardingApplicationByUserId);


module.exports = onboardingRouter;