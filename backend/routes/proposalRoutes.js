import express from 'express';
import Proposal from '../models/Proposal.js';
import Job from '../models/Job.js';
import Contract from '../models/Contract.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/proposals
// @desc    Get proposals submitted by the logged-in freelancer
router.get('/', protect, async (req, res) => {
  try {
    const proposals = await Proposal.find({ freelancerId: req.user.id })
      .populate('jobId')
      .sort({ createdAt: -1 });
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/proposals/client
// @desc    Get proposals submitted to jobs posted by the logged-in client
router.get('/client', protect, async (req, res) => {
  try {
    const clientJobs = await Job.find({ clientId: req.user.id }).select('_id');
    const jobIds = clientJobs.map(j => j._id);

    const proposals = await Proposal.find({
      $or: [
        { clientId: req.user.id },
        { jobId: { $in: jobIds } }
      ]
    }).populate('freelancerId', 'name title avatar rating reviewsCount hourlyRate skills')
      .populate('jobId')
      .sort({ createdAt: -1 });

    res.json(proposals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/proposals
// @desc    Submit a job proposal (Freelancers)
router.post('/', protect, async (req, res) => {
  try {
    const { jobId, bidAmount, estTime, coverLetter, role } = req.body;

    if (!jobId || !bidAmount) {
      return res.status(400).json({ message: 'Please provide job ID and bid amount.' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    const freelancer = await User.findById(req.user.id);
    if (!freelancer) {
      return res.status(404).json({ message: 'Freelancer profile not found.' });
    }

    // Check if freelancer already applied
    const existing = await Proposal.findOne({ jobId, freelancerId: req.user.id });
    if (existing) {
      return res.status(400).json({ message: 'You have already applied for this job.' });
    }

    const newProposal = await Proposal.create({
      jobId: job._id,
      freelancerId: freelancer._id,
      clientId: job.clientId,
      freelancerName: freelancer.name,
      freelancerAvatar: freelancer.avatar,
      freelancerTitle: freelancer.title,
      role: role || job.title,
      clientName: job.client?.name || 'Client',
      bidAmount,
      estTime: estTime || '10 Days',
      coverLetter: coverLetter || 'Hi! I am interested in this project and ready to deliver high quality work on time.',
      submittedDate: 'Today',
      status: 'Pending Review'
    });

    // Increment proposalsCount on Job
    job.proposalsCount = (job.proposalsCount || 0) + 1;
    await job.save();

    res.status(201).json(newProposal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/proposals/:id/accept
// @desc    Client accepts a proposal & creates active contract
router.put('/:id/accept', protect, async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found.' });
    }

    const client = await User.findById(req.user.id);
    const freelancer = await User.findById(proposal.freelancerId);

    proposal.status = 'Accepted';
    await proposal.save();

    // Create an active Contract
    const contract = await Contract.create({
      jobId: proposal.jobId,
      proposalId: proposal._id,
      clientId: req.user.id,
      freelancerId: proposal.freelancerId,
      freelancerName: proposal.freelancerName || freelancer?.name || 'Freelancer',
      freelancerAvatar: proposal.freelancerAvatar || freelancer?.avatar,
      title: proposal.role,
      amount: proposal.bidAmount,
      escrowAmount: proposal.bidAmount,
      status: 'active',
      client: {
        name: client?.name || 'Client',
        company: client?.companyName || `${client?.name}'s Company`,
        avatar: client?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
      },
      startedDate: 'Today',
      dueDate: proposal.estTime || '14 Days'
    });

    if (freelancer) {
      freelancer.activeProjects = (freelancer.activeProjects || 0) + 1;
      await freelancer.save();
    }

    res.json({ message: 'Proposal accepted and work started!', proposal, contract });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/proposals/:id/reject
// @desc    Client rejects a proposal
router.put('/:id/reject', protect, async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found.' });
    }

    proposal.status = 'Rejected';
    await proposal.save();

    res.json({ message: 'Proposal declined.', proposal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
