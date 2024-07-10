import mongoose, { Document, Schema } from 'mongoose';

interface IRegistrationToken extends Document {
  token: string;
  email: string;
  createdAt: Date;
  expiresAt: Date;
  isUsed: boolean;
}

const RegistrationTokenSchema: Schema = new Schema({
  token: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  isUsed: { type: Boolean, default: false }
});

export default mongoose.model<IRegistrationToken>('RegistrationToken', RegistrationTokenSchema);