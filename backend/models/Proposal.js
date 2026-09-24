import mongoose from 'mongoose';

const proposalSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  freelancerName: { type: String, default: 'Freelancer' },
  freelancerAvatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  freelancerTitle: { type: String, default: 'Fullstack Developer' },
  role: { type: String, required: true },
  clientName: { type: String, default: 'Verified Client' },
  bidAmount: { type: String, required: true },
  estTime: { type: String, default: '10 Days' },
  coverLetter: { type: String, default: 'Hi! I am interested in this project and ready to deliver high quality work on time.' },
  submittedDate: { type: String, default: 'Just now' },
  status: {
    type: String,
    enum: ['Pending Review', 'Accepted', 'Rejected', 'Completed'],
    default: 'Pending Review'
  }
}, { timestamps: true });

export default mongoose.model('Proposal', proposalSchema);
