import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  badge: { type: String, default: 'Urgent' },
  badgeType: { type: String, default: 'urgent' },
  postedTime: { type: String, default: '10 minutes ago' },
  budget: { type: String, required: true },
  minBudget: { type: Number, default: 500 },
  maxBudget: { type: Number, default: 5000 },
  type: { type: String, default: 'Fixed-Price • Milestone Based' },
  engagement: { type: String, enum: ['Fixed-Price', 'Hourly Rate'], default: 'Fixed-Price' },
  escrow: { type: Boolean, default: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  client: {
    name: { type: String, default: 'Apex Branch' },
    verified: { type: Boolean, default: true },
    rating: { type: Number, default: 5.0 },
    spent: { type: String, default: '$120k+ spent' },
    location: { type: String, default: 'United States' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80' }
  },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  proposalsCount: { type: Number, default: 0 },
  deadline: { type: String, default: '14 days remaining' },
  experience: { type: String, enum: ['Entry', 'Intermediate', 'Expert'], default: 'Expert' },
  status: { type: String, enum: ['open', 'in_progress', 'completed'], default: 'open' }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
