import mongoose, { Document, Schema } from 'mongoose';

interface IVisaStatus extends Document {
  userId: mongoose.Types.ObjectId;
  optReceipt: {
    url: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    feedback?: string;
  };
  optEAD: {
    url: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    feedback?: string;
  };
  i983: {
    url: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    feedback?: string;
  };
  i20: {
    url: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    feedback?: string;
  };
}

const VisaStatusSchema: Schema = new Schema({
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

export default mongoose.model<IVisaStatus>('VisaStatus', VisaStatusSchema);