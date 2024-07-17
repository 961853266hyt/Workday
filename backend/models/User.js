const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['EMP', 'HR'], default: 'EMP' },
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;