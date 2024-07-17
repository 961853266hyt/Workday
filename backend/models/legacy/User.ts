import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  // onboardingApplication?: Schema.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['EMP', 'HR'] },
  // onboardingApplication: { type: Schema.Types.ObjectId, ref: 'OnboardingApplication' },
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;