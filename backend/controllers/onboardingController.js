const OnboardingApplication = require('../models/OnboardingApplication');
const Document = require('../models/Document');
const fs = require('fs');

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

const createNewOnboardingApplication = async (req, res) => {
    try {
        const formData = req.body;
        console.log('Received formData:', formData);
        
        // Unflatten formData
        const parsedFormData = unflatten(formData);
        console.log('Parsed formData:', parsedFormData);

        // deal with files
        const profilePicture = req.files['profilePicture'] ? req.files['profilePicture'][0] : null;
        const optReceipt = req.files['workAuthorization.optReceipt'] ? req.files['workAuthorization.optReceipt'][0] : null;

        if (profilePicture) {
            parsedFormData.profilePicture = profilePicture.path;
        }
        documents = [];
        if (optReceipt) {
        const optReceiptDoc = new Document({
            userId: parsedFormData.userId,
            type: 'optReceipt',
            url: optReceipt.path,
            status: 'Pending'
        });
        await optReceiptDoc.save();
        parsedFormData.workAuthorization.optReceipt = optReceiptDoc._id;
        documents.push(optReceiptDoc);
        }

        const onboardingApp = new OnboardingApplication({
        ...parsedFormData,
        userId: parsedFormData.userId,
        documents,
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

const getOnboardingApplicationByUserId = async (req, res) => {
    try {
        const application = await OnboardingApplication.findOne({ userId: req.params.userId });
        if (!application) { // we want to tell the client that the user has not submitted an application instead of returning a 404
            return res.status(200).json({ message: 'this user has not submitted any application' });
        }
        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateOnboardingApplicationByUserId = async (req, res) => {
    try {
        const application = await OnboardingApplication.findOne({ userId: req.params.userId });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        const formData = req.body;  
        console.log('Received formData:', formData);
        const parsedFormData = unflatten(formData);
        console.log('Parsed formData:', parsedFormData);
        const profilePicture = req.files['profilePicture'] ? req.files['profilePicture'][0] : null;
        const optReceipt = req.files['workAuthorization.optReceipt'] ? req.files['workAuthorization.optReceipt'][0] : null;

        if (profilePicture) {
            parsedFormData.profilePicture = profilePicture.path;
            // replace the old profile picture with the new one
            if (application.profilePicture) {
                fs.unlinkSync(application.profilePicture);
                console.log('Old profile picture deleted: ', application.profilePicture);
            }
        }
        documents = [];

        if (optReceipt) {
            const optReceiptDoc = new Document({
                userId: parsedFormData.userId,
                type: 'optReceipt',
                url: optReceipt.path,
                status: 'Pending'
            });
            await optReceiptDoc.save();
            parsedFormData.workAuthorization.optReceipt = optReceiptDoc._id;
            documents.push(optReceiptDoc);
            // replace the old optReceipt with the new one
            if (application.workAuthorization.optReceipt) {
                const oldOptReceiptDoc = await Document.findById(application
                    .workAuthorization.optReceipt);
                fs.unlinkSync(oldOptReceiptDoc.url);
                console.log('Old optReceipt deleted: ', oldOptReceiptDoc.url);
            }
        }
        application.set(parsedFormData);
        application.documents = documents;
        application.updatedAt = Date.now();
        application.status = 'Pending';
        await application.save();
        res.status(200).json({ message: 'Onboarding application updated successfully' });
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

module.exports = {
    getAllOnboardingApplications,
    getOnboardingApplicationById,
    updateOnboardingApplicationById,
    createNewOnboardingApplication,
    getOnboardingApplicationByUserId,
    updateOnboardingApplicationByUserId
}