import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['freelancer', 'client'], required: true },
  title: { type: String, default: 'Independent Professional' },
  bio: { type: String, default: 'Passionate professional delivering high-quality work.' },
  hourlyRate: { type: Number, default: 45 },
  skills: [{ type: String }],
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  location: { type: String, default: 'Pune, India' },
  verified: { type: Boolean, default: true },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  successScore: { type: Number, default: 100 },
  totalEarned: { type: String, default: '$0.00' },
  totalSpent: { type: String, default: '$0.00' },
  companyName: { type: String, default: '' },
  activeProjects: { type: Number, default: 0 },
  completedProjects: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
