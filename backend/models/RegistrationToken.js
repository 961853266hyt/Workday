const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrationTokenSchema = new Schema({
    token: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    isUsed: { type: Boolean, default: false }
  });

const RegistrationToken = mongoose.model('RegistrationToken', RegistrationTokenSchema);

module.exports = RegistrationToken;