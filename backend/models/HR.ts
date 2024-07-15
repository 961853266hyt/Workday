import mongoose, { Schema } from 'mongoose';
import User from './User';

interface IHR extends mongoose.Document {
  department: string;
}

const HRSchema: Schema = new Schema({
  department: { type: String, required: true },
});

const HR = User.discriminator<IHR>('HR', HRSchema);
export default HR;