import mongoose, { Schema, Document } from 'mongoose';

export interface IUserMetrics extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  weightKg: number;
  heightCm: number;
  bmi: number;
  bmiCategory: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserMetricsSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  weightKg: { type: Number, required: true },
  heightCm: { type: Number, required: true },
  bmi: { type: Number, required: true },
  bmiCategory: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IUserMetrics>('UserMetrics', UserMetricsSchema);
