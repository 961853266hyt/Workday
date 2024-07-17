const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisaStatusSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    optReceipt: {
      url: { type: String, required: true },
      status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], required: true },
      feedback: { type: String }
    },
    optEAD: {
      url: { type: String, required: true },
      status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], required: true },
      feedback: { type: String }
    },
    i983: {
      url: { type: String, required: true },
      status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], required: true },
      feedback: { type: String }
    },
    i20: {
      url: { type: String, required: true },
      status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], required: true },
      feedback: { type: String }
    }
  });
  
const VisaStatus = mongoose.model('VisaStatus', VisaStatusSchema);
module.exports = VisaStatus;