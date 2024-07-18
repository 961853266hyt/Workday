const Document = require('../models/Document');

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }
        const document = new Document({
            userId: req.user.id,
            type: req.body.type,
            url: req.file.path,
            status: 'Pending',
        });
        await document.save();
        res.status(201).json({ document });
    } catch (error) {
        res.status(500).json({ message: 'File upload failed', error });
    }
}

const getDocumentsByUserId = async (req, res) => {
    try {
        const documents = await Document.find({ userId: req.user.id });
        res.json(documents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getDocumentById = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(document);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateDocumentById = async (req, res) => {
    const { id } = req.params;
    try {
        const document = await Document
            .findByIdAndUpdate(id, req
                .body, { new: true });
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(document);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    uploadFile,
    getDocumentsByUserId,
    getDocumentById,
    updateDocumentById
}
