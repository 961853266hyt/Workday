const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum:['optReceipt', 'I-20', 'DL', 'profilePicture'], required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'NONE'], required: true },
    feedback: { type: String }
  });

const Document = mongoose.model('Document', DocumentSchema);
module.exports = Document;