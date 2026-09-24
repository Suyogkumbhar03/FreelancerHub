import express from 'express';
import Contract from '../models/Contract.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Helper to parse currency string into number
const parseAmount = (str) => {
  if (!str) return 0;
  const cleaned = String(str).replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
};

// @route   GET /api/contracts
// @desc    Get all contracts for the logged-in user (role-aware)
router.get('/', protect, async (req, res) => {
  try {
    const isClient = req.user.role === 'client';
    const query = isClient ? { clientId: req.user.id } : { freelancerId: req.user.id };

    const contracts = await Contract.find(query)
      .populate('jobId')
      .populate('clientId', 'name email companyName avatar')
      .populate('freelancerId', 'name email title avatar')
      .sort({ updatedAt: -1 });

    const formatted = contracts.map(c => {
      const obj = c.toObject();
      obj.totalValue = obj.amount;
      obj.escrowProtected = obj.escrowAmount || obj.amount;
      return obj;
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/contracts/:id
// @desc    Get single contract
router.get('/:id', protect, async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate('jobId')
      .populate('clientId', 'name email companyName avatar')
      .populate('freelancerId', 'name email title avatar');

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    res.json(contract);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/contracts/:id/submit-work
// @desc    Freelancer submits completed work to client
router.put('/:id/submit-work', protect, async (req, res) => {
  try {
    const { link, notes } = req.body;

    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ message: 'Job contract not found.' });
    }

    // Verify freelancer ownership
    if (contract.freelancerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the assigned freelancer can submit work for this job.' });
    }

    contract.status = 'work_submitted';
    contract.deliverables = {
      link: link || '',
      notes: notes || 'Here is the completed work for your review.',
      submittedAt: new Date()
    };

    await contract.save();

    const formatted = contract.toObject();
    formatted.totalValue = formatted.amount;
    formatted.escrowProtected = formatted.escrowAmount || formatted.amount;

    res.json({
      message: 'Work submitted successfully! The client has been notified to review and release payment.',
      contract: formatted
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT /api/contracts/:id/approve-and-pay
// @desc    Client approves work and releases payment to freelancer
router.put('/:id/approve-and-pay', protect, async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ message: 'Job contract not found.' });
    }

    // Verify client ownership
    if (contract.clientId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the hiring client can approve work and release payment.' });
    }

    contract.status = 'completed';
    contract.paidAt = new Date();
    await contract.save();

    // Release funds and update freelancer wallet & stats
    const freelancer = await User.findById(contract.freelancerId);
    if (freelancer) {
      const currentEarned = parseAmount(freelancer.totalEarned);
      const paidNum = parseAmount(contract.amount);
      const newEarned = currentEarned + paidNum;

      freelancer.totalEarned = `$${newEarned.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      freelancer.completedProjects = (freelancer.completedProjects || 0) + 1;
      if (freelancer.activeProjects > 0) {
        freelancer.activeProjects -= 1;
      }
      await freelancer.save();
    }

    // Update client totalSpent
    const client = await User.findById(contract.clientId);
    if (client) {
      const currentSpent = parseAmount(client.totalSpent);
      const paidNum = parseAmount(contract.amount);
      const newSpent = currentSpent + paidNum;

      client.totalSpent = `$${newSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      await client.save();
    }

    const formatted = contract.toObject();
    formatted.totalValue = formatted.amount;
    formatted.escrowProtected = formatted.escrowAmount || formatted.amount;

    res.json({
      message: 'Payment released successfully! The freelancer has received the money in their wallet.',
      contract: formatted
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
