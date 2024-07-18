const express = require('express');
const upload = require('../upload');
const {
    uploadFile,
    getDocumentsByUserId,
    getDocumentById,
    updateDocumentById
} = require('../controllers/documentController');

const documentRouter = express.Router();

documentRouter.post('/upload', upload.single('file'), uploadFile);
documentRouter.get('/:id', getDocumentById);
documentRouter.patch('/:id', updateDocumentById);
documentRouter.get('/', getDocumentsByUserId);

module.exports = documentRouter;