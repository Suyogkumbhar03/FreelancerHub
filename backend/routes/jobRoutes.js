import express from 'express';
import Job from '../models/Job.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all open jobs
router.get('/', async (req, res) => {
  try {
    const { category, search, engagement } = req.query;
    let query = {};

    if (category && category !== 'All Categories') {
      query.category = category;
    }

    if (engagement && engagement !== 'All') {
      query.engagement = engagement;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/jobs/my
// @desc    Get jobs posted by the logged-in client
router.get('/my', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ clientId: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get single job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job (Clients only)
router.post('/', protect, async (req, res) => {
  try {
    const { title, category, budget, engagement, experience, tags, description } = req.body;

    if (!title || !description || budget === undefined || budget === null || budget === '') {
      return res.status(400).json({ message: 'Please provide job title, description, and budget.' });
    }

    const clientUser = await User.findById(req.user.id);
    const clientName = clientUser?.companyName || clientUser?.name || 'Verified Client';
    const clientSpent = clientUser?.totalSpent || '$0 spent';
    const clientAvatar = clientUser?.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80';

    const cleanNum = typeof budget === 'number' ? budget : (Number(String(budget).replace(/[^0-9.]/g, '')) || 2000);
    const formattedBudget = engagement === 'Hourly Rate' ? `$${cleanNum} / hr` : `$${cleanNum.toLocaleString()}`;

    const newJob = await Job.create({
      title: title.trim(),
      category: category || 'Web & Software Dev',
      budget: formattedBudget,
      minBudget: cleanNum,
      maxBudget: cleanNum,
      engagement: engagement || 'Fixed-Price',
      type: `${engagement || 'Fixed-Price'} • Safe Payment`,
      experience: experience || 'Intermediate',
      tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(t => t.trim()).filter(Boolean) : ['General']),
      description: description.trim(),
      clientId: req.user.id,
      client: {
        name: clientName,
        verified: true,
        rating: clientUser?.rating || 5.0,
        spent: clientSpent,
        location: clientUser?.location || 'India',
        avatar: clientAvatar
      },
      badge: 'New Job',
      badgeType: 'creative',
      postedTime: 'Just now',
      status: 'open'
    });

    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
