import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  profilePicture: string;
  currentAddress: {
    building: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phoneNumbers: {
    cell: string;
    work: string;
  };
  ssn: string;
  dateOfBirth: Date;
  gender: string;
  isCitizenOrPermanentResident: boolean;
  workAuthorization: {
    status: string;
    startDate: Date;
    endDate: Date;
    visaType: string;
    optReceipt: string;
  };
  references: Array<{
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    email: string;
    relationship: string;
  }>;
  emergencyContacts: Array<{
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    email: string;
    relationship: string;
  }>;
  documents: Array<Schema.Types.ObjectId>;
  visaStatus: Schema.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['EMP', 'HR'] },
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
    cell: { type: String },
    work: { type: String }
  },
  ssn: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String },
  isCitizenOrPermanentResident: { type: Boolean, required: true },
  workAuthorization: {
    status: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    visaType: { type: String },
    optReceipt: { type: String }
  },
  references: [{
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String },
    phone: { type: String },
    email: { type: String },
    relationship: { type: String }
  }],
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

export default mongoose.model<IUser>('User', UserSchema);