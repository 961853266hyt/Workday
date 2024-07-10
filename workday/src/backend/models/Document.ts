import mongoose, { Document, Schema } from 'mongoose';

interface IDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  url: string;
  uploadedAt: Date;
  status: 'Pending' | 'Approved' | 'Rejected';
  feedback?: string;
}

const DocumentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], required: true },
  feedback: { type: String }
});

export default mongoose.model<IDocument>('Document', DocumentSchema);