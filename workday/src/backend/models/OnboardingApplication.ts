import mongoose, { Document, Schema } from 'mongoose';

interface IOnboardingApplication extends Document {
  userId: mongoose.Types.ObjectId;
  status: 'Pending' | 'Approved' | 'Rejected';
  feedback?: string;
  submissionDate: Date;
  documents: mongoose.Types.ObjectId[];
  updatedAt: Date;
}

const OnboardingApplicationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], required: true },
  feedback: { type: String },
  submissionDate: { type: Date, default: Date.now },
  documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IOnboardingApplication>('OnboardingApplication', OnboardingApplicationSchema);