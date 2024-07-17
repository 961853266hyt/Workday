import mongoose, { Document, Schema } from 'mongoose';

interface IOnboardingApplication extends Document {
  userId: mongoose.Types.ObjectId;
  status: 'Pending' | 'Approved' | 'Rejected';
  feedback?: string;
  submissionDate: Date;
  updatedAt: Date;
  // input fields
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  profilePicture?: string;
  currentAddress: {
    building: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phoneNumbers: {
    cell: string;
    work?: string;
  };
  ssn: string;
  dateOfBirth: Date;
  gender: string;
  isCitizenOrPermanentResident: boolean;
  workAuthorization?: {
    status: string;
    startDate: Date;
    endDate: Date;
    visaType: string;
    optReceipt?: string; // only for F1 visa
  };
  references: {
    firstName: string;
    lastName: string;
    middleName?: string;
    phone?: string;
    email?: string;
    relationship: string;
  };
  emergencyContacts?: Array<{
    firstName: string;
    lastName: string;
    middleName?: string;
    phone?: string;
    email?: string;
    relationship: string;
  }>;
  documents: mongoose.Types.ObjectId[];
  visaStatus?: Schema.Types.ObjectId;
}

const OnboardingApplicationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], required: true },
  feedback: { type: String },
  submissionDate: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // input fields & profile info
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  preferredName: { type: String },
  profilePicture: { type: String },
  currentAddress: {
    building: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  },
  phoneNumbers: {
    cell: { type: String, required: true },
    work: { type: String }
  },
  ssn: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  isCitizenOrPermanentResident: { type: Boolean, required: true },
  workAuthorization: {
    status: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    visaType: { type: String },
    optReceipt: { type: String }
  },
  references: {
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String },
    phone: { type: String },
    email: { type: String },
    relationship: { type: String }
  },
  emergencyContacts: [{
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String },
    phone: { type: String },
    email: { type: String },
    relationship: { type: String }
  }],
  documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
  visaStatus: { type: Schema.Types.ObjectId, ref: 'VisaStatus' }
});

export default mongoose.model<IOnboardingApplication>('OnboardingApplication', OnboardingApplicationSchema);