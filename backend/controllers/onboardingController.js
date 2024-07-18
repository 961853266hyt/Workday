const OnboardingApplication = require('../models/OnboardingApplication');

const createNewOnboardingApplication = async (req, res) => {
    try {
        const application = new OnboardingApplication(req.body);
        await application.save();
        res.status(201).json(application);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getAllOnboardingApplications = async (req, res) => {
    try {
        const applications = await OnboardingApplication.find();
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getOnboardingApplicationById = async (req, res) => {
    try {
        const application = await OnboardingApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const updateOnboardingApplicationById = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await OnboardingApplication
            .findByIdAndUpdate(id, req.body, { new: true });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllOnboardingApplications,
    getOnboardingApplicationById,
    updateOnboardingApplicationById,
    createNewOnboardingApplication,
}