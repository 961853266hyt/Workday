const OnboardingApplication = require('../models/OnboardingApplication');
const Document = require('../models/Document');

const createNewOnboardingApplication = async (req, res) => {
    try {
        const formData = req.body;
        console.log('Received formData:', formData);
        
        const unflatten = (data) => {
            const result = {};
            for (const key in data) {
                const keys = key.split('.');
                keys.reduce((acc, part, index) => {
                    if (index === keys.length - 1) {
                        acc[part] = data[key];
                    } else {
                        if (!acc[part]) acc[part] = isNaN(keys[index + 1]) ? {} : [];
                        acc = acc[part];
                    }
                    return acc;
                }, result);
            }
            return result;
        };

        // Unflatten formData
        const parsedFormData = unflatten(formData);
        console.log('Parsed formData:', parsedFormData);

        // deal with files
        const profilePicture = req.files['profilePicture'] ? req.files['profilePicture'][0] : null;
        const optReceipt = req.files['workAuthorization.optReceipt'] ? req.files['workAuthorization.optReceipt'][0] : null;

        if (profilePicture) {
        const profileDoc = new Document({
            userId: parsedFormData.userId,
            type: 'profilePicture',
            url: profilePicture.path,
            status: 'Pending'
        });
        await profileDoc.save();
        parsedFormData.profilePicture = profileDoc._id;
        }
        if (optReceipt) {
        const optReceiptDoc = new Document({
            userId: parsedFormData.userId,
            type: 'optReceipt',
            url: optReceipt.path,
            status: 'Pending'
        });
        await optReceiptDoc.save();
        parsedFormData.workAuthorization.optReceipt = optReceiptDoc._id;
        }

        const onboardingApp = new OnboardingApplication({
        ...parsedFormData,
        userId: parsedFormData.userId,
        });
        await onboardingApp.save();
        res.status(201).json({ message: 'Onboarding application submitted successfully' });
    } catch (err) {
        console.error('Error details:', err); 
        if (err.errors) {
            const errors = Object.keys(err.errors).map(key => {
                return { field: key, message: err.errors[key].message };
            });
            return res.status(400).json({ errors });
        }

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