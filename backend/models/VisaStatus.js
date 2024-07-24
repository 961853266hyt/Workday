const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisaStatusSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    optReceipt: { type: Schema.Types.ObjectId, ref: 'Document' },
    optEad: { type: Schema.Types.ObjectId, ref: 'Document' },
    i983: { type: Schema.Types.ObjectId, ref: 'Document' },
    i20: { type: Schema.Types.ObjectId, ref: 'Document' },
  });
  
const VisaStatus = mongoose.model('VisaStatus', VisaStatusSchema);
module.exports = VisaStatus;