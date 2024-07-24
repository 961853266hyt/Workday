const VisaStatus = require('../models/VisaStatus');
const Document = require('../models/Document');


const createVisaStatus = async (req, res) => {
    try {
        const visaStatus = new VisaStatus(req.body);
        await visaStatus.save();

        res.status(201).json(visaStatus);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


const getAllVisaStatuses = async (req, res) => {
    try {
        const visaStatuses = await VisaStatus.find();
        res.json(visaStatuses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getVisaStatusById = async (req, res) => {
    try {
        const visaStatus = await VisaStatus.findById(req.params.id);
        if (!visaStatus) {
            return res.status(404).json({ message: 'Visa status not found' });
        }
        res.status(200).json(visaStatus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateVisaStatusById = async (req, res) => {
    const { id } = req.params;
    try {
        const visaStatus = await VisaStatus
            .findByIdAndUpdate(id , req.body, { new: true });
        if (!visaStatus) {
            return res.status(404).json({ message: 'Visa status not found' });
        }
        res.status(200).json(visaStatus);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getVisaStatusByUserId = async (req, res) => {
    try {
        const visaStatus = await VisaStatus.findOne({ userId: req.params.userId });
        if (!visaStatus) {
            return res.status(404).json({ message: 'Visa status not found' });
        }
        // get the document associated with the visa status
        if (visaStatus.optReceipt) {
            const document1 = await Document.findById(visaStatus.optReceipt);
            visaStatus.optReceipt = document1;
        }
        if (visaStatus.optEad) {
            const document2 = await Document.findById(visaStatus.optEad);
            visaStatus.optEad = document2;
        }
        if (visaStatus.i983) {
            const document3 = await Document.findById(visaStatus.i983);
            visaStatus.i983 = document3;
        }
        if (visaStatus.i20) {
            const document4 = await Document.findById(visaStatus.i20);
            visaStatus.i20 = document4;
        }
        res.status(200).json(visaStatus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateVisaStatusByUserId = async (req, res) => {
    try {
        const visaStatus = await VisaStatus.findOne({ userId: req.params.userId });
        if (!visaStatus) {
            return res.status(404).json({ message: 'Visa status not found' });
        }
        const updatedVisaStatus = await VisaStatus
            .findByIdAndUpdate(visaStatus._id, req.body, { new: true });
        if (updatedVisaStatus.optReceipt) {
            const document1 = await Document.findById(updatedVisaStatus.optReceipt);
            updatedVisaStatus.optReceipt = document1;
        }
        if (updatedVisaStatus.optEad) {
            const document2 = await Document.findById(updatedVisaStatus.optEad);
            updatedVisaStatus.optEad = document2;
        }
        if (updatedVisaStatus.i983) {
            const document3 = await Document.findById(updatedVisaStatus.i983);
            updatedVisaStatus.i983 = document3;
        }
        if (updatedVisaStatus.i20) {
            const document4 = await Document.findById(updatedVisaStatus.i20);
            updatedVisaStatus.i20 = document4;
        }
        res.status(200).json(updatedVisaStatus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



module.exports = {
    getAllVisaStatuses,
    getVisaStatusById,
    getVisaStatusByUserId,
    updateVisaStatusById,
    createVisaStatus,
    updateVisaStatusByUserId
}
