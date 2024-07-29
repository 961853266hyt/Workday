const mongoose = require('mongoose');

const RegistrationTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    expiration: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Submitted', 'Used'], default: 'Pending' }
});

module.exports = mongoose.model('RegistrationToken', RegistrationTokenSchema);