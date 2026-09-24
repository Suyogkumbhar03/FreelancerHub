import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  proposalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Proposal' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  freelancerName: { type: String, default: 'Freelancer' },
  freelancerAvatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  title: { type: String, required: true },
  amount: { type: String, required: true },
  escrowAmount: { type: String, default: '$0.00' },
  status: {
    type: String,
    enum: ['active', 'work_submitted', 'completed', 'cancelled'],
    default: 'active'
  },
  client: {
    name: { type: String, default: 'Client' },
    company: { type: String, default: 'Client Company' },
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80' }
  },
  deliverables: {
    notes: { type: String, default: '' },
    link: { type: String, default: '' },
    submittedAt: { type: Date }
  },
  paidAt: { type: Date },
  startedDate: { type: String, default: 'Today' },
  dueDate: { type: String, default: '14 Days' },
  milestones: [{
    name: { type: String },
    amount: { type: String },
    status: { type: String, enum: ['funded', 'released'], default: 'funded' }
  }]
}, { timestamps: true });

export default mongoose.model('Contract', contractSchema);
