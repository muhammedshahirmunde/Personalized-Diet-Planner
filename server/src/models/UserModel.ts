import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'user';
  age?: number;
  gender?: string;
  activityLevel?: string;
  dietaryPreference?: 'vegan' | 'non-vegan';
  healthGoal?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['user'], default: 'user' },
  age: { type: Number },
  gender: { type: String },
  activityLevel: { type: String },
  dietaryPreference: { type: String, enum: ['vegan', 'non-vegan'] },
  healthGoal: { type: String },
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
