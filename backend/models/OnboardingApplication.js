const { defaultMaxListeners } = require('events');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OnboardingApplicationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default:'Pending', required: true },
    feedback: { type: String },
    submissionDate: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    // input fields & profile info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    preferredName: { type: String },
    profilePicture: { type: Schema.Types.ObjectId, ref: 'Document' },
    currentAddress: {
      building: { type: String },
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String }
    },
    cell: { type: String, required: true },
    work: { type: String },
    ssn: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    isCitizenOrPermanentResident: { type: String, enum:['Yes', 'No'], required: true },
    greenCardOrCitizen: { type: String, enum: ['Green Card', 'Citizen', ''] },
    workAuthorization: {
    //   status: { type: String },
      startDate: { type: Date },
      endDate: { type: Date },
      visaType: { type: String, enum: ['F1(CPT/OPT)', 'H1-B', 'L2', 'H4', 'Other', ''] },
      optReceipt: { type: Schema.Types.ObjectId, ref: 'Document' },
      otherVisaTitle: { type: String },
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
  
const OnboardingApplication = mongoose.model('OnboardingApplication', OnboardingApplicationSchema);
module.exports = OnboardingApplication;